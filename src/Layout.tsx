import Logo from "./components/Logo";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='break-words max-w-2xl mx-auto px-4 pb-28'
        >
            {children}
            <Logo />
        </div>
    );
};

export default Layout;