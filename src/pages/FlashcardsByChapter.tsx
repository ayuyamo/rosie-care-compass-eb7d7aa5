import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchFlashcardsByChapterId } from "@/lib/supabase/supabaseApi";
import { CheckCircle } from "lucide-react";
import { FlashcardsByChapterSkeleton } from '@/components/ui/skeletons';

const FlashcardsByChapter = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const location = useLocation();
    const passedChapter = location.state?.chapter;
    const [currentCard, setCurrentCard] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFlashcards = async () => {
            if (!chapterId) return;
            setIsLoading(true);
            const flashcards = await fetchFlashcardsByChapterId(chapterId);
            const questions = flashcards.map((card) => card.question);
            setQuestions(questions);
            console.log('questions: ', questions);
            setIsLoading(false);
        }
        loadFlashcards();
        setCompleted(new Set());
        setCurrentCard(0);
    }, [chapterId]);

    const next = () => {
        setCurrentCard((prev) => (prev + 1) % questions.length);
    }
    const shuffle = () => {
        if (!questions) return;
        const dup = [...questions];
        for (let i = dup.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dup[i], dup[j]] = [dup[j], dup[i]];
        }

        setQuestions(dup);
        console.log('shuffled cards: ', dup);

    }

    const toggleComplete = () => {
        setCompleted((prev) => {
            const updated = new Set(prev);
            if (updated.has(questions[currentCard])) updated.delete(questions[currentCard]);
            else updated.add(questions[currentCard]);
            console.log('completed: ', updated);
            return updated;
        })
    }

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: barRef, isVisible: barVisible } = useScrollAnimation();
    const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation();

    const allComplete = questions.length > 0 && questions.every((q) => completed.has(q));
    const mark = questions.length > 0 && completed.has(questions[currentCard]);
    const progress = questions.length > 0 ? (completed.size / questions.length) * 100 : 0;

    if (isLoading) return <FlashcardsByChapterSkeleton />;

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-6 pb-24 max-w-md mx-auto space-y-4">
            <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link to="/flashcards" className="mr-4">
                    <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-black">
                    Chapter: <span className="italic">{passedChapter.name}</span>
                </h1>
            </header>
            <div>
                <div ref={barRef} className={`flex items-center gap-2 transition-all duration-1000 ${barVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className='flex-1 bg-gray-200 rounded-full h-4'>
                        <div className='bg-green-500 h-4 rounded-full transition-all duration-500'
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className='text-sm font-medium text-gray-700 whitespace-nowrap'>{completed.size}/{questions.length}</p>
                </div>
            </div>
            {!allComplete ? (<div ref={cardRef} className={`space-y-6 transition-all duration-1000 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className='relative p-14 border rounded-lg shadow text-center'>
                    {mark && <CheckCircle className="absolute top-3 right-3 text-green-500 w-6 h-6" />}
                    <h2 className="text-xl font-semibold mb-4">
                        {questions[currentCard]}
                    </h2>
                </div>
                <div className='space-x-4 flex justify-between'>
                    <button
                        onClick={next}
                        className="px-4 py-2 bg-white border-2 border-black text-black rounded-lg"
                    >
                        Next Question
                    </button>
                    <button
                        onClick={shuffle}
                        className="px-4 py-2 bg-white border-2 border-black text-black rounded-lg"
                    >
                        Shuffle Cards
                    </button>
                    <button
                        onClick={toggleComplete}
                        className="px-4 py-2 bg-white border-2 border-black text-black rounded-lg"
                    >
                        Mark {mark ? 'Incomplete' : 'Complete'}
                    </button>
                </div>
            </div>) : (
                <h2 className="text-center text-2xl font-semibold text-green-600">
                    All Cards Completed!
                </h2>
            )}
            <BottomNavigation />
        </div>
    )
}

export default FlashcardsByChapter;