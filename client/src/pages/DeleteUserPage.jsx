import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard'; 
import doctorImageone from '../images/doctor1.avif';
import doctorImagetwo from '../images/doctor2.jpeg';
import Banner from '../components/Banner';

const DeleteUserPage = () => {
  // State for the user's image URL
  const [userImage, setUserImage] = useState(doctorImagetwo); 

  // Function to handle image editing
  const handleEditImage = () => {
    console.log('Edit Image Clicked');
    setUserImage(doctorImageone); 
  };

  // Function to handle user deletion
  const handleDelete = () => {
    console.log('User Deleted');
  };

  return (
    <>
      <Banner goBackPath={"/"} />
      <div className="flex flex-col items-center justify-center">
        {/* Editable image section */}
        <div className="relative mt-4 mb-4">
          <img src={userImage} alt="User" className="rounded-full h-32 w-32 object-cover" />
          <span onClick={handleEditImage} className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">✏️</span>
        </div>
        
      </div>
      <ProfileCard buttonName={"Delete User"}/>
    </>
  );
};

export default DeleteUserPage;
