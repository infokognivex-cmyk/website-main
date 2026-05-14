  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import MainLayout from '../layouts/MainLayout';
  import AdminLayout from '../layouts/AdminLayout';
  import Home from '../pages/Home/Home';
  import About from '../pages/About/About';
  import Services from '../pages/Services/Services';
  import WebDevelopment from '../pages/Services/WebDevelopment';
  import MobileApps from '../pages/Services/MobileApps';
  import UIUX from '../pages/Services/UIUX';
  import CloudDevOps from '../pages/Services/CloudDevOps';
  import CRMSolutions from '../pages/Services/CRMSolutions';
  import SchoolSystems from '../pages/Services/SchoolSystems';
  import APIIntegration from '../pages/Services/APIIntegration';
  import EcommerceDev from '../pages/Services/EcommerceDev';
  import SaaSProductDev from '../pages/Services/SaaSProductDev';
  import Maintenance from '../pages/Services/Maintenance';
  import WordPressDev from '../pages/Services/WordPressDev';
  import ScrollToTop from '../components/Common/ScrollToTop';

  // ❌ REMOVE this (old blog page)
  // import BlogList from '../pages/Blog/BlogList';

  // ✅ USE NEW BLOG SYSTEM
  import BlogPage from '../components/Blog/BlogPage';
  import BlogDetails from '../components/Blog/BlogDetails';

  import Projects from '../pages/Projects/Projects';
  import ProjectDetails from '../pages/Projects/ProjectDetails';
  import Testimonials from '../pages/Testimonials/Testimonials';
  import Careers from '../pages/Careers/Careers';
  import Contact from '../pages/Contact/Contact';
  import GetQuote from '../pages/Contact/GetQuote';
  import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
  import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
  import AdminLogin from '../pages/Auth/AdminLogin';
  import Dashboard from '../pages/Admin/Dashboard';
  import ManageBlogs from '../pages/Admin/ManageBlogs';
  import CreateBlog from '../pages/Admin/CreateBlog';
  import EditBlog from '../pages/Admin/EditBlog';
  import CreateProject from '../pages/Admin/CreateProject';
  import ManageProjects from '../pages/Admin/ManageProjects';
  import EditProject from '../pages/Admin/EditProject';
  import ManageJobs from '../pages/Admin/ManageJobs';
  import CreateJob from '../pages/Admin/CreateJob';
  import EditJob from '../pages/Admin/EditJob';
  import UploadMedia from '../pages/Admin/UploadMedia';
  import NotFound from '../components/Common/NotFound';
  import ProtectedRoute from './ProtectedRoute';
  import RoleBasedRoute from './RoleBasedRoute';

  function AppRoutes() {
    return (
      <>
        <ScrollToTop />
        <Routes>

        {/* MAIN LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/web-development" element={<WebDevelopment />} />
          <Route path="services/mobile-apps" element={<MobileApps />} />
          <Route path="services/ui-ux" element={<UIUX />} />
          <Route path="services/cloud-devops" element={<CloudDevOps />} />
          <Route path="services/crm-solutions" element={<CRMSolutions />} />
          <Route path="services/school-systems" element={<SchoolSystems />} />
          <Route path="services/api-integration" element={<APIIntegration />} />
          <Route path="services/ecommerce-dev" element={<EcommerceDev />} />
          <Route path="services/saas-product-dev" element={<SaaSProductDev />} />
          <Route path="services/maintenance" element={<Maintenance />} />
          <Route path="services/wordpress-dev" element={<WordPressDev />} />

          {/* ✅ BLOG SYSTEM (CLEAN) */}
          <Route path="blog/:slug" element={<BlogDetails />} /> 
          <Route path="blog" element={<BlogPage />} />
          <Route path="blogs" element={<BlogPage />} /> {/* Added /blogs just in case */}
         
          
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="get-quote" element={<GetQuote />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleBasedRoute requiredRole="admin">
                <AdminLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
          <Route path="manage-projects" element={<ManageProjects />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="edit-project/:id" element={<EditProject />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="edit-job/:id" element={<EditJob />} />
          <Route path="upload-media" element={<UploadMedia />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
    );
  }

  export default AppRoutes;