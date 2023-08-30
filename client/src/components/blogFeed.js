import React from 'react'
import './styles/blog.css'
import Square from './square';
import { GET_SQUARES, SEARCH_SQUARES } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { BOOKMARK, LIKE } from '../utils/mutation';
import Auth from '../utils/auth';

const BlogFeed = () => {
    // const profile = Auth.getProfile();
    // const userId = profile.data._id

    const { loading, data } = useQuery(GET_SQUARES);

    // const [Bookmark] = useMutation(BOOKMARK);
    // const [Like] = useMutation(LIKE);

    // const bookmarkSquare = async (e) => {
    //     e.preventDefault();

    //     const squareId = e.target.getAttribute('square-id');

    //     const response = await Bookmark({
    //         variables: {
    //             user: userId,
    //             square: squareId,
    //         },
    //     });
    // }

    // const likeSquare = async (e) => {
    //     e.preventDefault();

    //     const squareId = e.target.getAttribute('square-id');

    //     const response = await Like({
    //         variables: {
    //             user: userId,
    //             square: squareId,
    //         },
    //     });
    // }

    // const searchSquares = async (e) => {
    //     e.preventDefault();

    //     const search = e.target.value;

    //     console.log(search)

    //     const { loading, error, data } = useQuery(SEARCH_SQUARES, {
    //         variables: { input },
    //     });

    // }

    return (
        <>
            {data ? (
                <section className='blog-feed'>
                    {data && data.squares.map((square) => (
                        <Square key={square._id} square={square} />
                    ))}
                </section>
            ) : null}
            {loading ? <img alt="loading" /> : null}
        </>
    )


}

export default BlogFeed



