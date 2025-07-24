
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Sparkles, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { fetchBookDetails } from "@/lib/supabase/supabaseApi";
import { subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { useEffect, useState, useLayoutEffect } from "react";
import { getConsistentColor } from "@/lib/colors";
import { OfficialBookSkeleton } from "@/components/ui/skeletons";

const OfficialBookSection = () => {
  const [book, setBook] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

  useEffect(() => {
    const loadBookInfo = async () => {
      try {
        const bookDetails = await fetchBookDetails('7116b66e-1e10-45c6-baef-22f3bb3800be');
        setBook(bookDetails);
        console.log('Successfully fetched book details: ', bookDetails);
      } catch (err) {
        console.log('Error fetching book: ', err);
      }
    };
    loadBookInfo();

    const unsubscribe = subscribeToTableChanges('books', (payload) => {
      const { eventType, new: newBook, old: oldBook } = payload;
      setBook((book) => {
        if (book.id === (eventType === 'DELETE' ? oldBook.id : newBook.id)) {
          if (eventType === 'UPDATE') {
            return { ...book, ...newBook };
          }
          if (eventType === 'DELETE') {
            console.log('book deleted');
            return null;
          }
        }

        return book;
      });
    });
    return () => {
      unsubscribe();
    }
  }, []);

  useLayoutEffect(() => {
    if (book) {
      console.log('book has been set: ', book);
      setHasLoaded(true);
    } else {
      console.log('book is null');
    }
  }, [book]);

  if (!hasLoaded || !book) {
    return <OfficialBookSkeleton />;
  }

  return (
    <section className="relative z-10 py-4">
      <div ref={sectionRef} className={`transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-2xl text-center font-bold text-[#232323] mb-4">Our Official Book</h3>
        <Link to={`/book-details/${book?.id}`} state={{ book }}>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-xl overflow-hidden pointer-events-none">
            {/* Top: image with fixed height or basis */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={book?.cover_url}
                alt="Book Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom: text content takes remaining space */}
            <div className="p-6 flex flex-col gap-y-2">
              <div>
                <h4 className="text-base font-bold text-[#232323] mb-2 leading-snug">
                  {book?.title}
                </h4>
                <p className="text-base text-[#4a4a4a] leading-relaxed mb-4">
                  {book?.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end">
                <p className={`text-[${getConsistentColor(book?.title)}] text-base pointer-events-auto`}>More Details</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`group/btn `}
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </section>
  );
};

export default OfficialBookSection;
