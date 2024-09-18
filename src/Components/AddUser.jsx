// src/components/AddUser.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qualification, setQualification] = useState('');
    const [sex, setSex] = useState(''); // State for sex
    const [phoneNo, setPhoneNo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get users from Redux store
    const users = useSelector(state => state.users);

    const handleAddUser = () => {
        if (!firstName || !lastName || !qualification || !sex || !phoneNo) {
            alert('All fields are required.');
            return;
        }

        // Check if user with the same phoneNo already exists
        const userExists = users.some(user => user.phoneNo === phoneNo);

        if (userExists) {
            alert('User with this phone number already exists.');
            return;
        }

        const newUser = {
            id: new Date().getTime(),
            firstName,
            lastName,
            qualification,
            sex,
            phoneNo,
        };

        dispatch(addUser(newUser));
        navigate('/');
    };

    return (
        <div className="container">
            <button className="back" onClick={() => navigate('/')}>Back</button>
            <div className="form-wrapper">
                <h2>Add User</h2>
                <div className="form-group">
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Qualification:</label>
                    <input 
                        type="text" 
                        value={qualification} 
                        onChange={(e) => setQualification(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Sex:</label>
                    <div className="checkbox-group">
                        <div>
                            <input 
                                type="radio" 
                                id="male" 
                                name="sex" 
                                value="Male"
                                checked={sex === 'Male'} 
                                onChange={(e) => setSex(e.target.value)} 
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="female" 
                                name="sex" 
                                value="Female"
                                checked={sex === 'Female'} 
                                onChange={(e) => setSex(e.target.value)} 
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Phone No:</label>
                    <input 
                        type="text" 
                        value={phoneNo} 
                        onChange={(e) => setPhoneNo(e.target.value)} 
                    />
                </div>
                <button onClick={handleAddUser}>Add User</button>
            </div>
        </div>
    );
}

export default AddUser;
