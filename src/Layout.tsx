import { Outlet } from "react-router-dom";
import { useTextSettings } from "./context/TextSettingsContext";

const Layout = () => {
    const { fontScale } = useTextSettings();
    return (
        <div className='break-words'
            style={{
                fontSize: `${fontScale * 100}%`,
                minHeight: '100vh',
                transition: 'all 0.3s ease',
            }}
        >
            <Outlet />
        </div>
    );
};

export default Layout;