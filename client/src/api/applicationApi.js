// src/api/applicationApi.js

import api from "./axios.js";

const ENDPOINT = "/applications";

export async function getApplications(params = {}) {
  const { data } = await api.get(ENDPOINT, { params });
  return data.data.applications;
}

export async function getApplication(id) {
  const { data } = await api.get(`${ENDPOINT}/${id}`);
  return data.data;
}

export async function createApplication(application) {
  const { data } = await api.post(ENDPOINT, application);
  return data.data;
}

export async function updateApplication(id, application) {
  const { data } = await api.patch(`${ENDPOINT}/${id}`, application);
  return data.data;
}

export async function deleteApplication(id) {
  const { data } = await api.delete(`${ENDPOINT}/${id}`);
  return data.data;
}