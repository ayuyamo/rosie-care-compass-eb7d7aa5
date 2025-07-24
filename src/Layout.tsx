const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='break-words max-w-2xl mx-auto px-4 pb-28'
        >
            {children}
        </div>
    );
};

export default Layout;