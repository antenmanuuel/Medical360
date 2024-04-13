import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AuthContext from "../auth/AuthContext";
import GlobalContext from "../store/GlobalContext";

const AllUsersPage = () => {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalContext);
  const [userData, setUserData] = useState([]); // State to hold the user data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://medical360-d65d823d7d75.herokuapp.com/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Use actual auth token here
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = (await response.json()).users; // This should be the array directly
        console.log(data);
        if (!Array.isArray(data)) {
          // Check if the data is an array
          console.error("Expected an array of users, received:", data);
          throw new Error("Data format error: Expected an array of users");
        }
        setUserData(data); // Set fetched user data to state, ensuring you're setting the array
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserData([]); // Ensure userData is reset to an empty array on error
      }
    };
    store.getAllDepartments();
    fetchUsers();
  }, [auth.token]); // Re-fetch when auth.token changes

  return (
    <>
      <Banner goBackPath="/resource-management" />
      <div className="flex justify-center my-4">
        <h1 className="text-3xl font-bold text-blue-500">All Users</h1>
      </div>
      <div className="flex justify-between items-center mx-8 mb-4">
        <SearchBar />
      </div>
      <div className="p-8">
        {Array.isArray(userData) ? (
          <Table cards={userData} isAdmin={auth.isAdmin} context="user" />
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </>
  );
};

export default AllUsersPage;
