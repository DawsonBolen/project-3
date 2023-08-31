import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET_SQUARES } from '../utils/queries';

const LandscapeHeader = () => {
    const [searchString, setSearchString] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const { loading, data } = useQuery(GET_SQUARES);

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
            <nav className='main-nav'>


                <Link to={'/Home'}>
                    <img src={process.env.PUBLIC_URL + '/images/square-share-logo.png'} height='75px'></img>
                </Link>



                <div className='search'>
                    <form className='search-bar' onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Search'
                            className='search-string'
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button className='search-button' type='submit'>
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



                <Link to={'/Profile'}>
                    <div className='user'>
                        <img src={process.env.PUBLIC_URL + '/images/user-icon.png'} width='45px'></img>
                    </div>
                </Link>

                <div className='main-links'>

                    <Link to='/Post'>
                        <div className='post-btn'>
                            <img src={process.env.PUBLIC_URL + '/images/post.png'} height='25px'></img>
                        </div>
                    </Link>


                    <Link to={'/Saved'}>
                        <div className='save'>
                            <img src={process.env.PUBLIC_URL + '/images/save.png'} height='25px'></img>
                        </div>
                    </Link>

                    <Link to={'/Explore'}>
                        <div className='explore'>
                            <img src={process.env.PUBLIC_URL + '/images/explore.png'} height='25px'></img>
                        </div>

                    </Link>

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