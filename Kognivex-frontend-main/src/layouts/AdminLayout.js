import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/manage-blogs', label: 'Manage Blogs', icon: '📝' },
    { path: '/admin/create-blog', label: 'Create Blog', icon: '✏️' },
    { path: '/admin/manage-projects', label: 'Manage Projects', icon: '🚀' },
    { path: '/admin/create-project', label: 'Create Project', icon: '➕' },
    { path: '/admin/manage-jobs', label: 'Manage Jobs', icon: '💼' },
    { path: '/admin/create-job', label: 'Create Job', icon: '📝' },
    { path: '/admin/upload-media', label: 'Media Upload', icon: '🖼️' }
  ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Admin Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.profileDropdown}`)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''} ${mobileMenuOpen ? styles.mobileActive : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.logo}>
            Kognivex Admin
            <button className={styles.mobileClose} onClick={closeMobileMenu}>×</button>
          </div>
          <nav className={styles.menu}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                <span style={{ marginRight: '0.75rem' }}>{item.icon}</span>
                {(!sidebarCollapsed || mobileMenuOpen) && item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.userSection}>
              <div className={styles.userAvatar}>
                {user?.name?.charAt(0) || 'A'}
              </div>
              {(!sidebarCollapsed || mobileMenuOpen) && (
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user?.name || 'Admin User'}</div>
                  <div className={styles.userRole}>Super Admin</div>
                </div>
              )}
            </div>
            
            <div className={styles.sidebarActions}>
              <button
                className={styles.sidebarToggle}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {sidebarCollapsed ? '➔' : '⬅'}
              </button>
              
              <button 
                className={styles.logoutBtn} 
                onClick={handleLogout}
                title="Logout"
              >
                {(!sidebarCollapsed || mobileMenuOpen) ? 'Logout' : '⏻'}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${styles.mainContent} ${sidebarCollapsed ? styles.mainContentCollapsed : ''}`}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.hamburger} onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
          </div>
          
          <div className={styles.topbarRight}>
            {/* Optional search or notifications can go here */}
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
