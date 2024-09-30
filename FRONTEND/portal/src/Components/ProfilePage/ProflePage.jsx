import React from 'react';
import './ProfilePage.css'; // Import CSS for styling

const ProfilePage = () => {
  return (
    <div className="profile-page_profile-page">
      
      <div className="sidebar_profile-page">
        <div className="display-picture_profile-page">
          <h3>Display Picture</h3>
        </div>
        <div className="personal-details_profile-page">
          <h3>Personal Details</h3>
        </div>
      </div>
          
      <div className='main-content_profile-page'>
      <div className="main-content_profile-page_1">
        <div className="technical-details_profile-page">
          <h3>Technical Details</h3>
        </div>
      </div>
      <div className="main-content_profile-page_2">
        <div className="technical-details_profile-page">
          <h3>Technical Details</h3>
        </div>
      </div>
      </div>
    </div>
  );
};
export default ProfilePage;
