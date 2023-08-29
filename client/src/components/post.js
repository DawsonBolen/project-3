import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutation';
import Auth from '../utils/auth';
import './styles/squareView.css';



const Post = ({ post }) => {
    const profile = Auth.getProfile();
    const userId = profile.data._id
    const [AddComment] = useMutation(ADD_COMMENT);
    const [formData, setData] = useState({ title: '', body: '' })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...formData, [name]: value });
    };

    const addComment = async (e) => {
        e.preventDefault();

        const postId = e.target.parentElement.getAttribute('post-id');

        console.log(formData.commentBody, userId, postId)

        const response = await AddComment({
            variables: {
                commentBody: formData.commentBody,
                user: userId,
                post: postId,
            },
        });
    }



    return (

        <div className='post-bod'
            key={post._id}
            post-id={post._id}
        >
            <h2>{post.postTitle}</h2>
            <p>{post.postBody}</p>
            <p>{post.user.username}</p>

            {post.comments.map((comment) => (
                <h2 className="comment" key={comment._id}>{comment.user.username} said: {comment.commentBody}</h2>
            ))}

            <form onSubmit={addComment} className='comment-form'>
                <input onChange={handleChange} value={formData.commentBody} name='commentBody'></input>
                <button type='submit'>comment</button>
            </form>

        </div>
    )
}

export default Post