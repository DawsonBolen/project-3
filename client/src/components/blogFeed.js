import React from 'react'
import './styles/blog.css'
import { GET_SQUARES } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

const BlogFeed = () => {



    const { loading, data } = useQuery(GET_SQUARES);

    return (
        <>
            {data ? (
                <section className='blog-feed'>
                    {data.squares.map((square) => (
                        <div
                            key={square._id}
                            className="square"
                        >
                            <div className='square-img' style={{ backgroundImage: `url${square.image})` }}>

                            </div>
                            <div className='square-description'>
                                <h2>{square.name}</h2>
                                <div className='square-line'></div>
                                <p className='short-description'>{square.shortDescription}</p>
                                <div className='likes-and-activity'>
                                    <div className='likes-total'>
                                        <img src={process.env.PUBLIC_URL + '/images/red-heart-icon.png'} width='15px' height='15px'></img>
                                        <h6>{square.likes}</h6>
                                    </div>
                                    <div className='posts-total'>
                                        <img src={process.env.PUBLIC_URL + '/images/posts-icon.png'} width='15px' height='15px'></img>
                                        <h6>{square.postCount}</h6>
                                    </div>

                                </div>
                                <div className='square-line-2'></div>
                                <div className='square-actions'>
                                    <div className='square-actions-1'>
                                        <div className='square-action-button square-like'>
                                            <img src={process.env.PUBLIC_URL + '/images/heart-icon.png'} width='22px'></img>
                                        </div>
                                        <div className='square-action-button square-save'>
                                            <img src={process.env.PUBLIC_URL + '/images/save.png'} width='15px'></img>
                                        </div>
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
                    ))}
                </section>
            ) : null}
            {loading ? <img alt="loading" /> : null}
        </>
    )
}

export default BlogFeed