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
    }



    return (

        <div className='post-body'
            key={post._id}
            post-id={post._id}
        >
            <div className='post-main-bod'>
                <div className='user-post-title'>
                    <img src={process.env.PUBLIC_URL + '/images/user-icon-small.png'} width='10px'></img>
                    <p>{post.user.username}</p>
                </div>
                <h2>{post.postTitle}</h2>
                <p>{post.postBody}</p>
                <p onClick={toggleShowComments}>View {post.commentCount} Comments</p>



            </div>

            {!comments ? (
                <></>
            ) : (
                <div className='comment-main'>
                    <div className='post-comments'>
                        {post.comments.map((comment) => (
                            <p className="comment" key={comment._id}>{comment.user.username} said: {comment.commentBody}</p>
                        ))}

                    </div>
                    <form onSubmit={addComment} className='comment-form'>
                        <input onChange={handleChange} value={formData.commentBody} name='commentBody'></input>
                        <button type='submit'>comment</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Post