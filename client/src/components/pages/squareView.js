import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_SQUARE } from '../../utils/queries';
import { CREATE_POST } from '../../utils/mutation';

import Auth from '../../utils/auth';
import '../styles/squareView.css';
import Post from '../post';
import ReactDOM from 'react-dom';
import { GET_POSTS } from '../../utils/queries';
// import { ApolloClient } from '@apollo/client';
// import { useApolloClient } from '@apollo/client';







const SquareView = () => {
    const navigate = useNavigate();
    const profile = Auth.getProfile();
    const userId = profile.data._id
    const { id } = useParams();
    const [CreatePost] = useMutation(CREATE_POST);




    const { loading, error, data, refetch } = useQuery(GET_SQUARE, {
        variables: { id },
    });

    console.log('square data: ', data)

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

        refetch();
        togglePostForm();

    }


    const [searchText, setSearchText] = useState('');
    const [highlightedContent, setHighlightedContent] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const textNodes = document.querySelectorAll('h2, p'); // Search only within h2 and p tags

        textNodes.forEach(node => {
            const text = node.textContent;
            const startIndex = text.indexOf(searchText);

            if (startIndex !== -1) {
                const before = text.substring(0, startIndex);
                const match = text.substring(startIndex, startIndex + searchText.length);
                const after = text.substring(startIndex + searchText.length);

                // Wrap the matched text in a span with class "highlight"
                const highlightedText = `${before}<span class="highlight">${match}</span>${after}`;

                node.innerHTML = highlightedText;
            }
        });
    };









    const [post, showPost] = useState(false);

    const togglePostForm = () => {
        showPost(!post)
    }

    return (
        <>

            {data ? (
                <main className='square-view-main'>
                    <div className='square-view-nav'>
                        <div className='square-nav-control'>
                            <h2 className='square-nav-name'>{data.square.name}</h2>
                            {!post ? (
                                <button className='addpost' onClick={togglePostForm}>Add Post</button>
                            ) : (
                                <button className='addpost' onClick={togglePostForm}>Cancel</button>
                            )}

                            <form className='search-square'>
                                <input type="text"
                                    placeholder="Search..."
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)} className='search-square-input'></input>
                                <button onClick={handleSearch} className='search-square-btn'>
                                    <img src={process.env.PUBLIC_URL + '/images/newsearchicon.png'} width='20px'></img>
                                </button>
                            </form>

                        </div>
                    </div>
                    <div className='square-main-content'>
                        <section className='square-view-intro'>
                            <div id='squar-image'>
                                <div className='square-view-img' style={{ backgroundImage: `url(${data.square.image})` }}>
                                </div>
                            </div>
                            <div className='square-view-intro-content'>

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
                                    <input placeholder='Caption' className='post-title-input' onChange={handleChange} value={formData.title} name='title'></input>
                                    <textarea placeholder='Write Here' className='post-content-input' onChange={handleChange} value={formData.body} name='body'></textarea>
                                    <button className='post-form-btn' type='submit'>Post</button>
                                </form>
                            </div>
                        )}
                        <section className='square-view-posts'>
                            {data.square.posts.map((post) => (
                                <Post key={post._id} post={post} post-id={post._id} />
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