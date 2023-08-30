import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_SQUARE } from '../../utils/queries';
import { CREATE_POST, ADD_COMMENT } from '../../utils/mutation';
import Auth from '../../utils/auth';
import '../styles/squareView.css';
import Post from '../post';

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

            {data ? (
                <main className='square-view-main'>
                    <div className='square-view-nav'>
                        {!post ? (
                            <button className='addpost' onClick={togglePostForm}>Add Post</button>
                        ) : (
                            <button className='addpost' onClick={togglePostForm}>Cancel</button>
                        )}
                    </div>
                    <div className='square-main-content'>
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
                            <></>
                        ) : (
                            <div className='post-form-bod'>
                                <div onClick={togglePostForm} className='x-button-post'>
                                    <div className='exit-btn-1'></div>
                                    <div className='exit-btn-1'></div>
                                </div>
                                <h1>Add Post</h1>
                                <div className='post-form-line'></div>
                                <form onSubmit={addPost} className='post-form'>
                                    <input placeholder='title' className='post-title-input' onChange={handleChange} value={formData.title} name='title'></input>
                                    <input placeholder='main post' className='post-content-input' onChange={handleChange} value={formData.body} name='body'></input>
                                    <button className='post-form-btn' type='submit'>Post</button>
                                </form>
                            </div>
                        )}
                        <section className='square-view-posts'>
                            {data.square.posts.map((post) => (
                                <Post key={post._id} post={post} postId={post._id} />
                            ))}
                        </section>
                    </div>
                </main>
            ) : null}
            {loading ? <img alt="loading" /> : null}
        </>
    )
}

export default SquareView