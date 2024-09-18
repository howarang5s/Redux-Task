// src/components/UserList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../Redux/actions/userAction';
import { persistor } from '../Redux/store';

function UserList() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleClearData = () => {
        persistor.purge(); 
        dispatch({ type: 'CLEAR_USERS' }); 
    };


    return (
        <div className="user-list">
            <div className="button-group">
                <button className="add-user-btn" onClick={() => navigate('/add')}>Add User</button>
                <button className="clear-data-btn" onClick={handleClearData}>Clear Data</button>
            </div>
            <h2>Users List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Qualification</th>
                        <th>Sex</th>
                        <th>Phone No</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.qualification}</td>
                            <td>{user.sex}</td>
                            <td>{user.phoneNo}</td>
                            <td className="action-buttons">
                                <button className="edit" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default UserList;
