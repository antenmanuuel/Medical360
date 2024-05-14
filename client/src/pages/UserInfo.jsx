import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';
import Modal from 'react-modal';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const UserInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser, BASE_URL } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(id);
      setUser(userData);
      setImagePreview(`${BASE_URL}/${userData.image}`);
    };
    fetchUser();
  }, [id, getUser, BASE_URL]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not upload image');
      toast.success('Image uploaded successfully');
      setImagePreview(`${BASE_URL}/${data.imagePath}`);
      setUser({ ...user, image: data.imagePath });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
    closeModal();
  };

  const handleCloseAndNavigate = () => {
    closeModal();
    navigate(`/user-info/${id}`);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Banner goBackPath="/apppage" />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
        <Box bgcolor="#CAD6FF" p={6} borderRadius={2} boxShadow={3} maxWidth="800px" width="100%">
          <Box display="flex" justifyContent="center" alignItems="center" bgcolor="white" p={2} borderRadius={2} mb={4}>
            <Box textAlign="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <div className="relative inline-block">
                  <Avatar src={imagePreview || `${BASE_URL}/${user.image}`} alt="Profile" sx={{ width: 96, height: 96, margin: '0 auto' }} />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-blue-500"></div>
                </div>
                <Button variant="contained" color="primary" onClick={openModal} sx={{ ml: 2 }}>
                  Choose Image
                </Button>
              </Box>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                  content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    padding: '20px',
                  },
                }}
              >
                <Typography variant="h6">Select Image</Typography>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="contained" color="success" onClick={handleImageUpload}>
                    Upload Image
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleCloseAndNavigate}>
                    Close
                  </Button>
                </Box>
              </Modal>
              <Typography variant="h5" color="#2260FF" mt={2}>{user.name}</Typography>
              <Typography>{user.email}</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Box flex={1} bgcolor="blue" color="white" p={2} borderRadius={1} mr={1}>
              <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
              <Typography>{user.email || 'No Email'}</Typography>
            </Box>
            <Box flex={1} bgcolor="blue" color="white" p={2} borderRadius={1} ml={1}>
              <Typography variant="subtitle1" fontWeight="bold">Phone Number</Typography>
              <Typography>{user.phone_number || 'No Phone Number'}</Typography>
            </Box>
          </Box>
          <Box bgcolor="white" p={2} borderRadius={1}>
            <Typography variant="subtitle1" color="#2260FF" fontWeight="bold">Admin</Typography>
            <Typography>{user.isAdmin ? "Admin" : "Not an admin"}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <Link to={`/change-password/${id}`} state={user}>
              <Button variant="contained" color="error" sx={{ mr: 2 }}>
                Change Password
              </Button>
            </Link>
            <Link to={`/user-schedule/${id}`}>
              <Button variant="contained" color="success">
                View Schedule
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default UserInfoPage;
