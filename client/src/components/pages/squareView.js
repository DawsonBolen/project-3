import React, { useState } from 'react'
import { GET_SQUARE } from '../../utils/queries';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutation';
import { ADD_COMMENT } from '../../utils/mutation';
import Auth from '../../utils/auth';
import '../styles/squareView.css';

const SquareView = () => {
    const navigate = useNavigate();
    const profile = Auth.getProfile();
    const userId = profile.data._id
    const { id } = useParams();
    const [CreatePost] = useMutation(CREATE_POST);
    const [AddComment] = useMutation(ADD_COMMENT);

    const { loading, error, data } = useQuery(GET_SQUARE, {
        variables: { id },
    });

    console.log(data)

    const [formData, setData] = useState({ title: '', body: '' })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...formData, [name]: value });
    };

    const addPost = async (e) => {
        e.preventDefault();

        const response = await CreatePost({
            variables: {
                postTitle: formData.title,
                postBody: formData.body,
                user: userId,
                square: id,
            },
        });
    }

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


    const [post, showPost] = useState(false);

    const togglePostForm = () => {
        showPost(!post)
    }

    return (
        <>

        { data ? (
        <main className='square-view-main'>
         <section className='square-view-intro'>
                        <div className='square-view-img' style={{ backgroundImage: `url(${data.square.image})` }}>
                        </div>

                        <div className='square-view-intro-description'>
                            <h1>{data.square.name}</h1>
                            <h4>{data.square.shortDescription}</h4>
                            <p>{data.square.longDescription}</p>
                        </div>
                    </section>
              {!post ? (
                        <button className='addpost' onClick={togglePostForm}>Add Post</button>
                    ) : (
                        <button className='addpost' onClick={togglePostForm}>Cancel</button>
                    )}
            {!post ? (
                <></>
            ): (
                <form onSubmit={addPost} className='post-form'>
                <input onChange={handleChange} value={formData.title} name='title'></input>
                <input onChange={handleChange} value={formData.body} name='body'></input>
                <button type='submit'>submit</button>
                </form>
            )}
            <section className='square-view-posts'>
            {data.square.posts.map((post) => (
                <div className='post' 
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
                
            ))}
            </section>

        </main>
        ) : null}
        {loading ? <img  alt="loading" /> : null}
    </>
)
}

export default SquareView