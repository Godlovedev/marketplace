import apiClient from "../../../api/apiClient";


export const CategoryService = {
  
  getAll: async () => {
    const response = await apiClient.get('/category');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/category/${id}`);
    return response.data;
  },

  create: async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    const response = await apiClient.post('/categories', { data });
    return response.data;
  },

  update: async (id: string, formData: FormData) => {
    const data = Object.fromEntries(formData)
    const response = await apiClient.patch(`/category/${id}`, { data });
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/category/${id}`);
  }
};