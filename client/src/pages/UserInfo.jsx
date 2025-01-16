import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const UserInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser, BASE_URL } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
    formData.append("image", selectedFile);
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/upload-image`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not upload image");
      toast.success("Image uploaded successfully");
      setImagePreview(`${BASE_URL}/${data.imagePath}`);
      setUser({ ...user, image: data.imagePath });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    }
    closeModal();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Banner goBackPath="/apppage" />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={imagePreview || `${BASE_URL}/${user.image}`}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <button
                onClick={openModal}
                className="absolute bottom-0 right-0 bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
            <h2 className="text-xl font-semibold text-blue-600 mt-4">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600">Email</h3>
              <p>{user.email || "No Email"}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600">Phone Number</h3>
              <p>{user.phone_number || "No Phone Number"}</p>
            </div>
          </div>

          {/* Admin Status */}
          <div className="bg-blue-100 p-4 rounded-lg mt-4">
            <h3 className="font-semibold text-gray-600">Admin Status</h3>
            <p>{user.isAdmin ? "Admin" : "Not an Admin"}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-center mt-6 space-x-4">
            <Link
              to={`/change-password/${id}`}
              state={user}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Change Password
            </Link>
            <Link
              to={`/user-schedule/${id}`}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-lg font-semibold text-gray-800">Select Image</h3>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="mt-4"
        />
        <div className="flex justify-between mt-6">
          <button
            onClick={handleImageUpload}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Upload
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UserInfoPage;
