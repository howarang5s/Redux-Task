// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Redux/actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const { id } = useParams(); // Get user ID from route params
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const users = useSelector(state => state.users);
    // Get the user to edit from the Redux store
    const user = useSelector(state => state.users.find(user => user.id === parseInt(id)));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qualification, setQualification] = useState('');
    const [sex, setSex] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setQualification(user.qualification);
            setSex(user.sex);
            setPhoneNo(user.phoneNo);
        }
    }, [user]);

    const handleUpdateUser = () => {
        if (!firstName || !lastName || !qualification || !sex || !phoneNo) {
            alert('All fields are required.');
            return;
        }

        // Check if user with the same phoneNo already exists
        // const userExists = users.some(user => user.phoneNo === phoneNo);

        // if (userExists) {
        //     alert('User with this phone number already exists.');
        //     return;
        // }

        const updatedUser = {
            id: parseInt(id),
            firstName,
            lastName,
            qualification,
            sex,
            phoneNo,
        };

        dispatch(updateUser(updatedUser));
        navigate('/');
    };

    return (
        <div className="container">
            <button className="back" onClick={() => navigate('/')}>Back</button>
            <div className="form-wrapper">
                <h2>Edit User</h2>
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
                <button onClick={handleUpdateUser}>Update User</button>
            </div>
        </div>
    );
}

export default EditUser;
