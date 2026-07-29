import api from "./axios";

export const getApplications = async (params = {}) => {
  const { data } = await api.get("/applications", { params });
  return data.data;
};

export const getApplication = async (id) => {
  const { data } = await api.get(`/applications/${id}`);
  return data.data;
};

export const createApplication = async (application) => {
  const { data } = await api.post("/applications", application);
  return data.data;
};

export const updateApplication = async (id, application) => {
  const { data } = await api.put(`/applications/${id}`, application);
  return data.data;
};

export const deleteApplication = async (id) => {
  const { data } = await api.delete(`/applications/${id}`);
  return data.data;
};