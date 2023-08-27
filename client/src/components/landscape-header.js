import React from 'react'
import { Link } from 'react-router-dom';

const LandscapeHeader = () => {
    return (
        <header>
            <nav className='main-nav'>

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

                <Link to={'/Profile'}>
                    <div className='user'>
                        <img src='images/user-icon.png' width='45px'></img>
                    </div>
                </Link>
                
                <div className='main-links'>

                    <Link className='nav-link-style' to='/CreateSquare'>
                        <div className='post'>
                            <img src='images/post.png' height='25px'></img>
                        </div>
                    </Link>

                    <Link to={'/Saved'}>
                        <div className='save'>
                            <img src='images/save.png' height='25px'></img>
                        </div>
                    </Link>

                    <Link to={'/Explore'}>
                        <div className='explore'>
                            <img src='images/explore.png' height='25px'></img>
                        </div>

                    </Link>

                    <Link className='nav-link-style' to='/Home'>
                        <div className='home'>
                            <img src='images/home-icon.png' height='25px'></img>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default LandscapeHeader