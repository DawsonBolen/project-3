import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../utils/queries';
import Auth from '../../utils/auth';
import '../styles/blog.css'

const Saved = () => {
    const profile = Auth.getProfile();
    const id = profile.data._id;
  
    const { loading, error, data } = useQuery(GET_PROFILE, {
      // Pass the profileId as a variable to the query
      variables: { id },
    });
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const squares = data?.user?.squares || [];

    return (
        <div>
            {squares.length > 0 ? (
                <div>
                    {squares.map((square) => (
                <div
                key={square._id}
                className="square"
            >
                <div className='square-img' style={{ backgroundImage: `url(${square.image})` }}>

                </div>
                <div className='square-description'>
                    <h2>{square.name}</h2>
                    <div className='square-line'></div>
                    <p className='short-description'>{square.shortDescription}</p>
                    <div className='likes-and-activity'>
                        <div className='likes-total'>
                            <img src='images/red-heart-icon.png' width='15px' height='15px'></img>
                            <h6>{square.likes}</h6>
                        </div>
                        <div className='posts-total'>
                            <img src='images/posts-icon.png' width='15px' height='15px'></img>
                            <h6>{square.postCount}</h6>
                        </div>

                    </div>
                    <div className='square-line-2'></div>
                    <div className='square-actions'>
                        <div className='square-actions-1'>
                            <div className='square-action-button square-like'>
                                <img src='images/heart-icon.png' width='22px'></img>
                            </div>
                            <div className='square-action-button square-save'>
                                <img src='images/save.png' width='15px'></img>
                            </div>
                            <div className='square-action-button square-remove'>
                                <img src='images/x-icon.png' width='19px'></img>
                            </div>
                        </div>
                        <div className='square-actions-2'>
                        <Link  to={`/SquareView/${square._id}`}>
                            <button className='view-square'>
                                View Square
                                <img src='images/arrow-icon.png' height='15px'></img>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
                ))}
                </div>
            ) : (
                <div>No saved squares.</div>
            )}
        </div>
    );
}

export default Saved;