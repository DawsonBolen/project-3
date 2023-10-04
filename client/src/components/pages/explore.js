import React from 'react'
import Post from '../post';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_SQUARES } from '../../utils/queries';


const Explore = () => {

    const { loading, data } = useQuery(GET_SQUARES);

    return (
        <section className='square-view-posts'>
             {data.squares.map((square) => (
                <div key={square._id} className='square-view-posts'>
                    {square.posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            ))}
        </section>
)
}

export default Explore;