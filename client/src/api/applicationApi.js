// src/api/applicationApi.js

import api from "./axios";

const ENDPOINT = "/applications";

export const getApplications = async (params = {}) => {
  const { data } = await api.get(ENDPOINT, { params });
  return data.data.applications;
};

export const getApplication = async (id) => {
  const { data } = await api.get(`${ENDPOINT}/${id}`);
  return data.data.application;
};

export const createApplication = async (application) => {
  const { data } = await api.post(ENDPOINT, application);
  return data.data.application;
};

export const updateApplication = async (id, application) => {
  const { data } = await api.patch(`${ENDPOINT}/${id}`, application);
  return data.data.application;
};

export const deleteApplication = async (id) => {
  await api.delete(`${ENDPOINT}/${id}`);
};