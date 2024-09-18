// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import UserList from './Components/UserList';
import './App.css';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
              <div className="app-container">
                  <h1>User Management System</h1>
                  <Routes>
                      <Route path="/" element={<UserList />} />
                      <Route path="/add" element={<AddUser />} />
                      <Route path="/edit/:id" element={<EditUser />} />
                  </Routes>
              </div>
          </Router>
        </PersistGate>
      </Provider>  
    );
}

export default App;
