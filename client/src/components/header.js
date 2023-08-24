import React, { useState, useEffect } from "react";
import LandscapeHeader from "./landscape-header";
import MobileHeader from "./mobile-header";

function Header() {
    const screenWidthChange = 992;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= screenWidthChange);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= screenWidthChange);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {!isMobile ? (
                <LandscapeHeader />
            ) : <MobileHeader />}

        </div>
    )
}

export default Header;

