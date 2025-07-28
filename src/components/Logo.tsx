import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const Logo = () => {

    const { ref: logoRef, isVisible: logoVisible } = useScrollAnimation(window.innerHeight, true);
    return (
        <div ref={logoRef} className={`pt-4 pb-24 transition-all duration-700 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <p className="text-lg text-gray-500 text-center mb-2">Powered by</p>
            <img src="/1.png" alt="logo" className="mx-auto block w-60 my-0 py-0" />
        </div>
    );
};

export default Logo;