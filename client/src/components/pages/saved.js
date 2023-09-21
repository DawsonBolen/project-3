import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../utils/queries';
import { REMOVE_BOOKMARK } from '../../utils/mutation';
import Auth from '../../utils/auth';
import '../styles/blog.css'
import '../styles/saved.css';
import Square from '../square';

const Saved = () => {
    const [RemoveBookmark] = useMutation(REMOVE_BOOKMARK)

    const profile = Auth.getProfile();
    const id = profile.data._id;

    const { loading, error, data } = useQuery(GET_PROFILE, {
        // Pass the profileId as a variable to the query
        variables: { id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const squares = data?.user?.bookmarkedSquares || [];

    const removeBookmark = async (e) => {
        e.preventDefault();

        const squareId = e.target.getAttribute('square-id');

        const response = await RemoveBookmark({
            variables: {
                user: id,
                square: squareId,
            },
        });
    }

    return (
        <div>
            {squares.length > 0 ? (
                <div className='saved-main'>
                    {squares.map((square) => (
                        <Square key={square._id} square={square} userData={data} />
                    ))}
                </div>
            ) : (
                <div>No saved squares.</div>
            )}
        </div>
    );
}

export default Saved;