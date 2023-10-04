import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'; // Import `useParams()` from 'react-router-dom'
import { GET_PROFILE } from '../../utils/queries';
import { EDIT_USER } from '../../utils/mutation';
import Auth from '../../utils/auth';
import '../styles/profile.css';
import Saved from './saved';
import Post from '../post';
import Square from '../square';

const Profile = () => {
  const fileInputRef = useRef(null)
  const [EditUser] = useMutation(EDIT_USER);

  const profile = Auth.getProfile();
  const id = profile.data._id

  const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
    // Pass the profileId as a variable to the query
    variables: { id },
  });

  useEffect(() => {
    refetch();
  }, []);

  const [postImage, setPostImage] = useState({ image: ''})

  const handleFileUpload = async (e) => {
      e.preventDefault();
  
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, image: base64 });
  
      try {
        const { data } = await EditUser({
          variables: {
            image: base64,
          },
        });

        await refetch();
  
        // Handle success, maybe show a message or update local state
        console.log("Image upload successful:", data);
      } catch (error) {
        // Handle error, maybe show an error message
        console.error("Error uploading image:", error);
      }  
  };
  
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

  console.log(data.user)

  return (
    <main className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {/* <img src="profile_picture_url" alt="Profile" /> */}
          <div className='profile-badge'>
          
            
            {/* Clickable image */}
            <img
              src={data.user.image ? (data.user.image): process.env.PUBLIC_URL + '/images/profile-pic.png'}
              alt="Upload" height='200px'
              style={{ cursor: 'pointer', borderRadius: '50%' }}
              onClick={() => fileInputRef.current.click()}
            />

            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />

          </div>

          {/* <img src={process.env.PUBLIC_URL + '/images/profile-pic.png'} height='200px' >
          </img> */}

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
            <div>
            {data.user.posts.map((post) => (
                <Post key={post._id} post={post} postId={post._id} />
            ))}
            </div>
          </section>
        ) : (
          <section className='profile-squares'>
            <div className='delete-squares'> 
            delete a square
            </div>
            <div>
            {data && data.user.createdSquares.map((square) => (
              <Square key={square._id} square={square} userData={data} />
            
            ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Profile;

function convertToBase64(file){
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
          resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
          reject(error)
      };
  })
}