import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../utils/queries';
import { REMOVE_BOOKMARK } from '../../utils/mutation';
import Auth from '../../utils/auth';
import '../styles/blog.css'
import '../styles/saved.css';

const Saved = () => {
    const [RemoveBookmark] = useMutation(REMOVE_BOOKMARK)

    const profile = Auth.getProfile();
    const id = profile.data._id;

    const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
        // Pass the profileId as a variable to the query
        variables: { id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const squares = data?.user?.bookmarkedSquares || [];

    const removeBookmark = async (e) => {
        e.preventDefault();

        const squareId = e.target.getAttribute('square-id');

        const response = await RemoveBookmark({
            variables: {
                user: id,
                square: squareId,
            },
        });
        refetch();
    }

    return (
        <div>
            {squares.length > 0 ? (
                <div className='saved-main'>
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
                                        <h6>{square.likesCount}</h6>
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
                                            <img onClick={removeBookmark} square-id={square._id} src='images/x-icon.png' width='19px'></img>
                                        </div>
                                    </div>
                                    <div className='square-actions-2'>
                                        <Link to={`/SquareView/${square._id}`} style={{ textDecoration: 'none' }}>
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