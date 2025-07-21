
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Sparkles, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { fetchBookDetails } from "@/lib/supabase/supabaseApi";
import { subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { useEffect, useState, useLayoutEffect } from "react";
import { getConsistentColor } from "@/lib/colors";

const OfficialBookSection = () => {
  const [book, setBook] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

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
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    } else {
      console.log('book is null');
    }
  }, [book]);

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div ref={sectionRef} className={`transition-all duration-1000 ${sectionVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold text-[#232323] mb-4">Our Official Book</h3>
          <Link to={`/book-details/${book?.id}`} state={{ book }}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-xl overflow-hidden pointer-events-none flex flex-col h-[450px]">
              {/* Top: image with fixed height or basis */}
              <div className="basis-1/3 max-h-[200px]">
                <img
                  src={book?.cover_url}
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom: text content takes remaining space */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#232323] mb-2 leading-snug">
                    {book?.title}
                  </h4>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed mb-4">
                    {book?.description}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`group/btn text-[${getConsistentColor(book?.title)}] pointer-events-auto`}
                  >
                    More Details
                    <ArrowRight className="ml-2 h-4 w-4 relative top-[1px] transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfficialBookSection;
