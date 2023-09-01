import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutation';
import Auth from '../utils/auth';
import './styles/squareView.css';



const Post = ({ post }) => {
    console.log(post)
    const profile = Auth.getProfile();
    const userId = profile.data._id
    const [AddComment] = useMutation(ADD_COMMENT);
    const [formData, setData] = useState({ title: '', body: '' })
    const [comments, showComments] = useState(false);
    const [commentForm, showCommentForm] = useState(false);

    const [commentData, setCommentData] = useState(post.comments);

    const toggleCommentForm = () => {
        showCommentForm(!commentForm)
    }

    const toggleShowComments = () => {
        showComments(!comments)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...formData, [name]: value });
    };

    const addComment = async (e) => {
        e.preventDefault();

        const response = await AddComment({
            variables: {
                commentBody: formData.commentBody,
                user: userId,
                post: post._id,
            },
        });
        const newComment = response.data.addComment;
        setCommentData([...commentData, newComment]);
    }



    return (

        <div className='post-body'
            key={post._id}
            post-id={post._id}
        >
            <div className='post-main-bod'>
                <div className='post-main-bod-1'>
                    <h2 className='post-title'>{post.postTitle}</h2>
                    <div className='user-post-title'>
                        <img src={post.user.image ? (post.user.image): process.env.PUBLIC_URL + '/images/profile-pic.png'} width='14px'></img>
                        <p>{post.user.username}</p>
                    </div>
                </div>

                <p>{post.postBody}</p>
                <div onClick={toggleShowComments} className='comments-view-btn'>
                    <img src={process.env.PUBLIC_URL + '/images/posts-icon.png'} width='14px'></img>
                    <p className='comment-label'>Comments</p>
                </div>



            </div>

            {!comments ? (
                <></>
            ) : (
                <div className='comment-main'>
                    <div className='comment-control'>
                        <form onSubmit={addComment} className='comment-form'>
                            <input placeholder='add Comment' className='comment-input' onChange={handleChange} value={formData.commentBody} name='commentBody'></input>
                            <button className='comment-post' type='submit'>
                                <img src={process.env.PUBLIC_URL + '/images/post.png'} width='14px'></img>
                            </button>
                        </form>
                        <h5>{post.commentCount} Total Comments</h5>
                        <div onClick={toggleShowComments} className='x-button-comment'>
                            <div className='comment-exit-btn-1'></div>
                            <div className='comment-exit-btn-1'></div>
                        </div>
                    </div>
                    <div className='post-comments'>

                        {commentData.map((comment) => (
                            <div key={comment._id} className='comment-bod'>
                                <div className='comment-bod-user'>
                                    <img src={process.env.PUBLIC_URL + '/images/user-icon-small.png'} width='14px' height='14px'></img>
                                    <p>{comment.user.username}</p>
                                </div>
                                <div className='comment-content'>
                                    <p>{comment.commentBody}</p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            )}
        </div>
    )
}

export default Post