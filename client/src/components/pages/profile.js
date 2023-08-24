import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'; // Import `useParams()` from 'react-router-dom'
import { GET_PROFILE } from './utils/queries';

const Profile = () => {
  const { profileId } = useParams(); // Use `useParams()` to retrieve the profileId from the route parameter

  const { loading, error, data } = useQuery(GET_PROFILE, {
    // Pass the profileId as a variable to the query
    variables: { profileId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { username, fullName, bio, followers, following } = data.profile;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {/* Add your profile picture */}
          <img src="profile_picture_url" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{username}</h2>
          <p>{fullName}</p>
          <p>{bio}</p>
        </div>
      </div>
      <div className="profile-stats">
        <div>
          <strong>{following}</strong> following
        </div>
      </div>
      {/* Add more content like user posts, saved posts, etc. */}
    </div>
  );
};

export default Profile;