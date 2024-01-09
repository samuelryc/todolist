import React from 'react';
import App from '../App';
import PrivateRoute from '../PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NoMatch from '../pages/NoMatch';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

export default function Root() {
    return (
        <Router>
            <div className="todo-app-container">
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<PrivateRoute />}>
                            <Route exact path='/' element={<App />}/>
                        </Route>
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/contact" element={<Contact />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="*" element={<NoMatch />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}