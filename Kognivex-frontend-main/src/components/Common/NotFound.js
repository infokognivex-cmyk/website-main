import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 — Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Return home</Link>
    </main>
  );
}

export default NotFound;
