import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Submit = () => {
    const [showForm, setShowForm] = useState(false);
    const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation(window.innerHeight, true);
    const googleFormUrl =
        'https://docs.google.com/forms/d/e/1FAIpQLSdJ6z0fKohEOq_CGLH6dcpIuPY4uU5Zk8jh_Itic1Ajhk0Drg/viewform?embedded=true';

    return (
        <section ref={cardRef} className={`relative z-10 mb-10 px-4 transition-all duration-1000 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="max-w-md mx-auto">
                <div className="border border-gray-200 rounded-xl shadow-xl text-center text-black p-8 m-6 max-w-md lg:max-w-[670px] mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold">Stories & Resources</h2>
                    <p className="text-gray-600 text-sm">
                        Have something to share? Submit your story or resource below.
                    </p>
                    <button
                        className="inline-block bg-black text-white hover:bg-gray-900 hover:scale-105 font-semibold py-3 px-6 rounded-full shadow-md transition transform duration-200"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Hide' : 'Show'} Form
                    </button>

                    {showForm && (
                        <div className="w-full max-w-full overflow-y-auto overflow-x-hidden">
                            <iframe
                                src={googleFormUrl}
                                className="w-full border-0"
                                style={{
                                    height: '1491px',
                                    display: 'block',
                                    margin: 0,
                                    padding: 0,
                                }}
                                title="Google Form"
                            >
                                Loading…
                            </iframe>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Submit;
