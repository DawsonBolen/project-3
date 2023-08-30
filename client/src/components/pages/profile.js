import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'; // Import `useParams()` from 'react-router-dom'
import { GET_PROFILE } from '../../utils/queries';
import Auth from '../../utils/auth';
import '../styles/profile.css';
import Saved from './saved';
import Post from '../post';
import Square from '../square';

const Profile = () => {

  const profile = Auth.getProfile();
  const id = profile.data._id

  const { loading, error, data } = useQuery(GET_PROFILE, {
    // Pass the profileId as a variable to the query
    variables: { id },
  });

  console.log(data)

  const [activeSection, setActiveSection] = useState('saved');

  function setSavedActive() {
    setActiveSection('saved');
  }

  function setPostsActive() {
    setActiveSection('posts');
  }

  function setSquaresActive() {
    setActiveSection('squares');
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {/* <img src="profile_picture_url" alt="Profile" /> */}
          <img src={process.env.PUBLIC_URL + '/images/profile-pic.png'} height='200px' ></img>

        </div>
        <div className='profile-2'>
          <div className='p2-1'>
            <h2>{data.user.username}</h2>
            <button className='edit-profile'>Edit Profile</button>
          </div>
          <div className='profile-stats'>
            <p>{data.user.postCount} Posts</p>
            <p className='saved-post-count'>{data.user.savedCount} Saved</p>
            <p>{data.user.totalLikes} Likes</p>
          </div>
          <p className='user-email'>{data.user.email}</p>
          <button className='logout-btn' onClick={Auth.logout}>Logout</button>

        </div>
      </div>
      <div className='profile-line'></div>
      <div className='profilepage-control'>
        <div className={`profile-control-btns ${activeSection === 'saved' ? 'active-control' : ''}`}
          onClick={setSavedActive} id='profile-saved'>
          <img src={process.env.PUBLIC_URL + '/images/profile-saved.png'} height='15px' ></img>
          <p>Saved</p>
        </div>
        <div className={`profile-control-btns ${activeSection === 'posts' ? 'active-control' : ''}`}
          onClick={setPostsActive} id='profile-posts'>
          <img src={process.env.PUBLIC_URL + '/images/profile-posts.png'} height='15px' ></img>
          <p>Posts</p>
        </div>
        <div className={`profile-control-btns ${activeSection === 'squares' ? 'active-control' : ''}`}
          onClick={setSquaresActive} id='profile-squares'>
          <img src={process.env.PUBLIC_URL + '/images/profile-squares.png'} height='15px' ></img>
          <p>Squares</p>
        </div>
      </div>
      <div className='profile-content'>
        {activeSection === 'saved' ? (
          <div>
            <Saved />
          </div>
        ) : activeSection === 'posts' ? (
          <section className='square-view-posts'>
            {data.user.posts.map((post) => (
                <Post key={post._id} post={post} postId={post._id} />
            ))}
          </section>
        ) : (
          <section className='profile-squares'>
            {data && data.user.createdSquares.map((square) => (
              <Square key={square._id} square={square} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Profile;