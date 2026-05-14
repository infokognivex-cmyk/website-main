import api from './api';

const blogService = {
  fetchBlogs: async () => {
    const response = await api.get('/blogs');
    return response.data?.data;
  },
  fetchAllBlogs: async () => {
    const response = await api.get('/blogs');
    return response.data?.data;
  },
  fetchBlogBySlug: async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data?.data;
  },
  fetchBlogBySlugAdmin: async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data?.data;
  },
  createBlog: async (formData) => {
    const response = await api.post('/blogs', formData);
    return response.data?.data;
  },
  updateBlog: async (id, formData) => {
    // If formData is already a FormData object, send it directly
    // Otherwise, it might be a plain object (legacy support or internal use)
    const data = formData instanceof FormData ? formData : new FormData();
    
    if (!(formData instanceof FormData)) {
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
    }

    const response = await api.put(`/blogs/${id}`, data);
    return response.data?.data;
  },
  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  }
};

export default blogService;
