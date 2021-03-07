import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <h1>404 - Not Found!</h1>
        <br />
        <Link to="/">
            Go Home
        </Link>
    </div>
);

export default NotFound;