import api from './api';

const projectService = {
  fetchProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  fetchProjectBySlug: async (slug) => {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  },
  createProject: async (project) => {
    const response = await api.post('/projects', project);
    return response.data;
  },
  updateProject: async (id, project) => {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};

export default projectService;
