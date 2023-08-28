import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
    const [show, showNav] = useState(false);

    const toggleShowNav = () => {
        showNav(!show)
    }
    return (
        <header>
            <nav className='mobile-nav'>

                <div className='mobile-nav-top'>
                    <Link to={'/Home'}>
                        <img className='logo-mobile' src='images/square-share-logo.png' height='50px'></img>
                    </Link>

                    <div className='search'>
                        <form className='search-bar'>
                            <input type='text' placeholder='Search' className='search-string'></input>
                            <button className='search-button'>
                                <img src='images/newsearchicon.png' width='20px'></img>
                            </button>
                        </form>
                    </div>

                    {!show ? (
                        <div onClick={toggleShowNav} className='hamburger-menu'>
                            <div className='hamburger-bar'></div>
                            <div className='hamburger-bar'></div>
                            <div className='hamburger-bar'></div>
                        </div>
                    ) :
                        <div onClick={toggleShowNav} className='x-button'>
                            <div className='x-btn-1'></div>
                            <div className='x-btn-1'></div>
                        </div>
                    }

                </div>

                {!show ? (
                    <></>

                ) :
                    <div className='mobile-nav-content'>

                        <Link to='/Profile' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container user-container'>
                                <div className='user'>
                                    <img src='images/user-icon.png' width='45px'></img>
                                </div>
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link to='/Post' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container post-container'>

                                <div className='post'>

                                    <img src='images/post.png' height='25px'></img>

                                </div>
                                <p>Create</p>

                            </div>
                        </Link>

                        <Link to='/Saved' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container save-container'>
                                <div className='save'>
                                    <img src='images/save.png' height='25px'></img>
                                </div>
                                <p>Saved</p>
                            </div>
                        </Link>

                        <Link to='/Explore' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container explore-container'>
                                <div className='explore'>
                                    <img src='images/explore.png' height='25px'></img>
                                </div>
                                <p>Explore</p>
                            </div>
                        </Link>
                    </div>
                }

            </nav>
        </header>
    )
}

export default MobileHeader