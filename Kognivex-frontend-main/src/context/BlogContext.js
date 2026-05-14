import React, { createContext, useEffect, useMemo, useState } from 'react';
import blogService from '../services/blogService';

export const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await blogService.fetchBlogs();
        const publishedBlogs = (allBlogs || []).filter((b) => b.status === 'published');
        setBlogs(publishedBlogs);
      } catch (error) {
        console.warn('Unable to load blogs from backend.');
      }
    };

    fetchBlogs();
  }, []);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const updateBlog = (slug, updates) => {
    setBlogs((prev) => prev.map((item) => (item.slug === slug ? { ...item, ...updates } : item)));
  };

  const removeBlog = (slug) => {
    setBlogs((prev) => prev.filter((item) => item.slug !== slug));
  };

  const value = useMemo(
    () => ({ blogs, addBlog, updateBlog, removeBlog }),
    [blogs]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
