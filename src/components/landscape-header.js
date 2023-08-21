import React from 'react'
import { Link } from 'react-router-dom';

const LandscapeHeader = () => {
    return (
        <header>
            <nav className='main-nav'>

                <img src='images/square-share-logo.png' height='75px'></img>


                <div className='search'>
                    <form className='search-bar'>
                        <input type='text' placeholder='Search' className='search-string'></input>
                        <button className='search-button'>
                            <img src='images/newsearchicon.png' width='20px'></img>
                        </button>
                    </form>
                </div>
                <div className='user'>
                    <img src='images/user-icon.png' width='45px'></img>
                </div>

                <div className='main-links'>
                    <Link className='nav-link-style' to='/Post'>
                        <div className='post'>

                            <img src='images/post.png' height='25px'></img>

                        </div>
                    </Link>
                    <div className='save'>
                        <img src='images/save.png' height='25px'></img>
                    </div>

                    <div className='explore'>
                        <img src='images/explore.png' height='25px'></img>
                    </div>
                    <div className='home'>
                        <img src='images/home-icon.png' height='25px'></img>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default LandscapeHeader