import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'; // Import `useParams()` from 'react-router-dom'
import { GET_PROFILE } from '../../utils/queries';
import Auth from '../../utils/auth';

const Profile = () => {

  const profile = Auth.getProfile();
  const id = profile.data._id

  const { loading, error, data } = useQuery(GET_PROFILE, {
    // Pass the profileId as a variable to the query
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {/* Add your profile picture */}
          <img src="profile_picture_url" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{data.user.username}</h2>
          <p>{data.user.email}</p>
        </div>
      </div>
      <div className="profile-stats">
      </div>
      {/* Add more content like user posts, saved posts, etc. */}
    </div>
  );
};

export default Profile;