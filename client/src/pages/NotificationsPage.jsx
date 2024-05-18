import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    padding: '20px',
    backgroundColor: '#E0E7FF',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    margin: '20px',
};

const notificationStyle = {
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
};

const readNotificationStyle = {
    ...notificationStyle,
    backgroundColor: '#D6E4FF',
};

const unreadNotificationStyle = {
    ...notificationStyle,
    backgroundColor: '#FFFFFF',
};

const titleStyle = {
    color: '#3A77F7',
    fontSize: '24px',
    marginBottom: '8px',
};

const messageStyle = {
    color: '#333',
    marginBottom: '8px',
};

const dateStyle = {
    color: '#555',
};

const NotificationsPage = () => {
    const { user } = useAuthContext();
    const { BASE_URL, getPatient } = useGlobalContext();
    const [notifs, setNotifs] = useState(user.notifications);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch(`${BASE_URL}/users/get-notifications/${user.id}`, 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: null      
                }
            );
            if (response.ok) {
                const json = await response.json();
                setNotifs(json);
            }
        }
        fetchNotifications();
    }, []);

    const mark = async (notification, read) => {
        // Code to delete notification
        notification.read = read;
        const response = await fetch(`${BASE_URL}/users/notification/${user.id}`, 
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(notification)      
            }
        );
        if (response.ok) {
            setNotifs(await response.json());
        }
    };

    const deleteNotification = async (notification) => {
        // Code to delete notification
        const response = await fetch(`${BASE_URL}/users/notification/${user.id}`, 
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(notification)      
            }
        );
        if (response.ok) {
            setNotifs(notifs.filter(not => not._id !== notification._id));
        }
    };

    const viewPatient = async id => {
        await getPatient(id);
        navigate(`/process-details/`)
    }

    return (
        <>
            <Banner goBackPath={"/apppage"} />
            <Box style={containerStyle}>
                <Typography variant="h4" gutterBottom>Notifications</Typography>
                {user && notifs && notifs.map(notification => (
                    <Box key={notification._id} sx={notification.read ? readNotificationStyle : unreadNotificationStyle}>
                        <Typography variant="h5" sx={titleStyle}>{notification.title}</Typography>
                        <Typography variant="body1" sx={messageStyle}>{notification.message}</Typography>
                        <Typography variant="body2" sx={dateStyle}>Date: {notification.date.toLocaleString()}</Typography>
                        {notification.patient && <Button onClick={() => viewPatient(notification.patient)}>View Patient</Button>}
                        {!notification.read? <Button startIcon={<CheckIcon />} onClick={() => mark(notification, true)}>Mark as Read</Button>
                        : <Button startIcon={<RestoreIcon />} onClick={() => mark(notification, false)}>Mark as Unread</Button>}
                        <IconButton onClick={() => deleteNotification(notification)}>
                            <DeleteIcon />
                        </IconButton>
                        <Divider />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default NotificationsPage;