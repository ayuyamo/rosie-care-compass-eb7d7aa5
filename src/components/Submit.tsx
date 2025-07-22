const Submit = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl text-center text-black p-8 m-6 max-w-md lg:max-w-[670px] mx-auto space-y-6">
            <h2 className="text-2xl font-semibold">Stories & Resources</h2>
            <p className="text-gray-600 text-sm">
                Have something to share? Submit your story or resource below.
            </p>
            <a
                href="https://forms.gle/KHot41A7oj8XL6WU9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white hover:bg-gray-900 hover:scale-105 font-semibold py-3 px-6 rounded-full shadow-md transition transform duration-200"
            >
                Submit Story
            </a>
        </div>
    );
}

export default Submit;