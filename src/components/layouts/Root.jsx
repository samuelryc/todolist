import React from 'react';
import App from '../App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import NoMatch from '../pages/NoMatch';
import Login from '../pages/Login';

export default function Root() {
    return (
        <Router>
            <div className="todo-app-container">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                        <Route path="*" element={<NoMatch />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}