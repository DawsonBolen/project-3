import React, { useState } from 'react';
import './styles/blog.css'
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { BOOKMARK, LIKE, REMOVE_BOOKMARK } from '../utils/mutation';
import Auth from '../utils/auth';
import { GET_SQUARES, SEARCH_SQUARES, GET_PROFILE } from '../utils/queries'

const Square = ({ square } ) => {
    const profileId = Auth.getProfile();
    const id = profileId.data._id
  
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
        // Pass the profileId as a variable to the query
        variables: { id },
      });
    
    const toggleLike = () => {
        setLiked(!liked)
    };

    const toggleBookmark = () => {
        setSaved(!saved)
    };


    const profile = Auth.getProfile();
    const userId = profile.data._id

    const [bookmarkMutation] = useMutation(BOOKMARK);
    const [likeMutation] = useMutation(LIKE);
    const [unBookmarkMutation] = useMutation(REMOVE_BOOKMARK);

    const bookmarkSquare = async () => {
        const response = await bookmarkMutation({
            variables: {
                user: userId,
                square: square._id,
            },

        });

        toggleBookmark();
        refetch();

    }

    const likeSquare = async () => {
        const response = await likeMutation({
            variables: {
                user: userId,
                square: square._id,
            },
        });
        toggleLike();
        refetch();
    };

    const unBookmark = async () => {
        const response = await unBookmarkMutation({
            variables: {
                user: userId,
                square: square._id,
            }
        })
        toggleBookmark();
        refetch();
    }


    //  const unlikeSquare = async () => {
    //     const response = await unlikeMutation({
    //         variables: {
    //             user: userId,
    //             square: square._id,
    //         },
    //     });
    //     toggleLike();
    // };



    return (
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
                        <img src={process.env.PUBLIC_URL + '/images/red-heart-icon.png'} width='15px' height='15px'></img>
                        <h6>{square.likesCount}</h6>
                    </div>
                    <div className='posts-total'>
                        <img src={process.env.PUBLIC_URL + '/images/posts-icon.png'} width='15px' height='15px'></img>
                        <h6>{square.postCount}</h6>
                    </div>

                </div>
                <div className='square-line-2'></div>
                <div className='square-actions'>
                    <div className='square-actions-1'>

                        {/*-Dawson: this conditionally renders the button. so once whe get the unlike function working we will add that as the onclick on the second part of the conditional renderring */}

                        {!liked ? (
                            <div onClick={likeSquare} square-id={square._id} className='square-action-button square-like'>
                                <img src={process.env.PUBLIC_URL + '/images/heart-icon.png'} width='22px'></img>
                            </div>
                        ) : (

                            <div onClick={likeSquare} square-id={square._id} className='square-action-button square-like'>
                                <img src={process.env.PUBLIC_URL + '/images/red-heart-icon.png'} width='22px'></img>
                            </div>
                        )}



                        {!saved ? (
                            <div onClick={bookmarkSquare} square-id={square._id} className='square-action-button square-save'>
                                <img src={process.env.PUBLIC_URL + '/images/save.png'} width='15px'></img>
                            </div>
                        ) : (
                            <div onClick={unBookmark} square-id={square._id} className='square-action-button square-save'>


                                <img src={process.env.PUBLIC_URL + '/images/red-save-icon.png'} width='15px'></img>

                            </div>
                        )}






                        <div className='square-action-button square-remove'>
                            <img src={process.env.PUBLIC_URL + '/images/x-icon.png'} width='19px'></img>
                        </div>
                    </div>
                    <div className='square-actions-2'>
                        <Link to={`/SquareView/${square._id}`} style={{ textDecoration: 'none' }}>
                            <button className='view-square'>
                                View Square
                                <img src={process.env.PUBLIC_URL + '/images/arrow-icon.png'} height='15px'></img>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Square;