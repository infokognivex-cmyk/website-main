import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ErrorBoundary from '../components/Common/ErrorBoundary';

function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <ErrorBoundary>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default MainLayout;
