import React from 'react'
import { Link } from 'react-router-dom';

const LandscapeHeader = () => {
    return (
        <header>
            <nav className='main-nav'>

                <img src={process.env.PUBLIC_URL + '/images/square-share-logo.png'} height='75px'></img>


                <div className='search'>
                    <form className='search-bar'>
                        <input type='text' placeholder='Search' className='search-string'></input>
                        <button className='search-button'>
                            <img src={process.env.PUBLIC_URL + '/images/newsearchicon.png'} width='20px'></img>
                        </button>
                    </form>
                </div>
                <div className='user'>
                    <img src={process.env.PUBLIC_URL + '/images/user-icon.png'} width='45px'></img>
                </div>

                <div className='main-links'>
                    <Link className='nav-link-style' to='/Post'>
                        <div className='post'>
                            <img src={process.env.PUBLIC_URL + '/images/post.png'} height='25px'></img>
                        </div>
                    </Link>
                    <div className='save'>
                        <img src={process.env.PUBLIC_URL + '/images/save.png'} height='25px'></img>
                    </div>

                    <div className='explore'>
                        <img src={process.env.PUBLIC_URL + '/images/explore.png'} height='25px'></img>
                    </div>
                    <Link className='nav-link-style' to='/Home'>
                        <div className='home'>
                            <img src={process.env.PUBLIC_URL + '/images/home-icon.png'} height='25px'></img>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default LandscapeHeader