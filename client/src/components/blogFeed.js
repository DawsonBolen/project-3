import React from 'react'
import './styles/blog.css'
import { BlogData } from '../blogdata'

const BlogFeed = () => {
    return (
        <section className='blog-feed'>
            {BlogData.map((square) => (
                <div
                    key={square.id}
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
                                <h6>128 Likes</h6>
                            </div>
                            <div className='posts-total'>
                                <img src='images/posts-icon.png' width='15px' height='15px'></img>
                                <h6>58 Posts</h6>
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
                                <button className='view-square'>
                                    View Square
                                    <img src='images/arrow-icon.png' height='15px'></img>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            ))}
        </section>
    )
}

export default BlogFeed