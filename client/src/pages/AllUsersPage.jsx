import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGlobalContext } from '../hooks/useGlobalContext';

const AllUsersPage = () => {
    const { user } = useAuthContext();
    const { getAllDepartments, getAllUsers, users } = useGlobalContext();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem("lastRoute", "/all-users");
        async function fetchUsers() {
            if (user && !users) {
                await getAllDepartments();
                await getAllUsers();
            }
        }
        fetchUsers();

        return () => {
            localStorage.removeItem("lastRoute");
        };
    }, [user, users]);

    useEffect(() => {
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(lowercasedTerm) ||
                user.email.toLowerCase().includes(lowercasedTerm)
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    return (
        <>
            <Banner goBackPath="/resource-management" />
            <div className="flex justify-center my-4">
                <div className="text-blue-500 p-4 rounded-lg text-3xl">
                    All Users
                </div>
            </div>
            <div className="flex justify-between items-center mx-8 mb-4">
                <SearchBar onSearch={setSearchTerm} />
                {user && user.isAdmin && (
                    <Link to={"/register"} className="bg-[#2260FF] text-white px-2 py-1 rounded-md font-medium text-xl">
                        New User
                    </Link>
                )}
            </div>
            <div className="p-8">
                {filteredUsers && <Table cards={filteredUsers} isAdmin={user && user.isAdmin} context={"user"} showEditButton={false} showDeleteButton={true}/>}
                
            </div>
        </>
    );
};

export default AllUsersPage;
