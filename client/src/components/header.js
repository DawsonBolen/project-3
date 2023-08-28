import React, { useState, useEffect } from "react";
import LandscapeHeader from "./landscape-header";
import MobileHeader from "./mobile-header";
import Auth from "../utils/auth";

function Header() {
    const screenWidthChange = 992;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= screenWidthChange);

    const loggedIn = Auth.loggedIn();

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
            {!loggedIn ? (
                <div></div>
            ):(
                <div>
                    {!isMobile ? (
                        <LandscapeHeader />
                    ) : <MobileHeader />}
                </div>
            )}
        </div>
    )
}

export default Header;

