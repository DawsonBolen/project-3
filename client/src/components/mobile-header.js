import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET_SQUARES } from '../utils/queries';

const MobileHeader = () => {
    const [show, showNav] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const { loading, data } = useQuery(GET_SQUARES);

    const toggleShowNav = () => {
        showNav(!show)
    }

    useEffect(() => {
        if (searchString) {
            const results = queryData(searchString);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    }, [searchString]);

    const queryData = (query) => {
        const queryData = data?.squares;
        return queryData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchString) {
            const newUrl = new URL(window.location.origin);
            newUrl.searchParams.set('search_term', searchString);
            window.location.href = newUrl.toString();
        }
    };

    return (
        <header>
            <nav className='mobile-nav'>

                <div className='mobile-nav-top'>
                    <Link to={'/Home'}>
                        <img className='logo-mobile' src={process.env.PUBLIC_URL + '/images/square-share-logo.png'} height='50px'></img>
                    </Link>

                    <div className='search'>
                        <form className='search-bar' type='submit' onSubmit={handleSearch}>
                            <input
                                type='text'
                                placeholder='Search'
                                className='search-string'
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                            />
                            <button className='search-button'>
                                <img src={process.env.PUBLIC_URL + '/images/newsearchicon.png'} width='20px'></img>
                            </button>
                        </form>
                        {suggestions.length > 0 && (
                            <div className='suggestions-dropdown'>
                                {suggestions.map((suggestion, index) => (
                                    <Link key={index} to={`/SquareView/${suggestion._id}`}>
                                        <div className='suggestion-item'>
                                            {suggestion.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
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
                                    <img src={process.env.PUBLIC_URL + '/images/user-icon.png'} width='45px'></img>
                                </div>
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link to='/Post' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container post-container'>

                                <div className='post-btn'>

                                    <img src={process.env.PUBLIC_URL + '/images/post.png'} height='25px'></img>

                                </div>
                                <p>Create</p>

                            </div>
                        </Link>

                        <Link to='/Saved' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container save-container'>
                                <div className='save'>
                                    <img src={process.env.PUBLIC_URL + '/images/save.png'} height='25px'></img>
                                </div>
                                <p>Saved</p>
                            </div>
                        </Link>

                        <Link to='/Explore' onClick={toggleShowNav} style={{ color: '#495867', textDecoration: 'none' }}>
                            <div className='nav-container explore-container'>
                                <div className='explore'>
                                    <img src={process.env.PUBLIC_URL + '/images/explore.png'} height='25px'></img>
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