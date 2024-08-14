/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/admin/check', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return null;
    }

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
