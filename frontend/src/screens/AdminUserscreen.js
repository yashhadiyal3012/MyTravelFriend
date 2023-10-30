import React, { useState, useEffect } from "react";
import { Tabs, Button, Modal } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminUserscreen() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get("/api/users/getAllUsers")).data;
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }
        fetchData();
    }, []);

    const handleDeleteClick = (userId) => {
        setDeleteUserId(userId);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            // Send a DELETE request to your API to delete the user by ID
            await axios.delete(`/api/users/deleteUser/${deleteUserId}`);
            // Remove the deleted user from the users state
            setUsers(users.filter(user => user._id !== deleteUserId));
            // Close the delete confirmation modal
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error(error);
            // Handle any errors here
        }
    };

    return (
        <div className="table-container" >
            <h3>Users</h3>
            {loading && (<Loader />)}
            <table className="bs">
                <thead>
                    <tr>
                        <th>User Id :</th>
                        <th>Name :</th>
                        <th>Email :</th>
                        <th>Is Admin :</th>
                        <th>Action:</th> {/* Added for the delete button */}
                    </tr>
                </thead>
                <tbody>
                    {users && (
                        users.map(user => (
                            <tr key={user._id}>
                                <td data-label="User Id : ">{user._id}</td>
                                <td data-label="Name : ">{user.name}</td>
                                <td data-label="Email : ">{user.email}</td>
                                <td data-label="Is Admin : ">{user.isAdmin ? "YES" : "NO"}</td>
                                <td>
                                    <Button type="danger" onClick={() => handleDeleteClick(user._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <br />
            <Modal
                title="Confirm Deletion"
                visible={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={() => setIsDeleteModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                Are you sure you want to delete this user?
            </Modal>
        </div>
    );
}

export default AdminUserscreen;
