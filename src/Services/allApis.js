import commonApi from "./commonApi";
import baseUrl from "./baseUrl";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const signupApi = (data) => commonApi(`${baseUrl}/auth/register`, "POST", data, {});
export const signinApi = (data) => commonApi(`${baseUrl}/auth/login`, "POST", data, {});
export const logoutApi = () => commonApi(`${baseUrl}/auth/logout`, "POST", {}, authHeader());
export const addProjectApi = (data) => commonApi(`${baseUrl}/projects`, "POST", data, authHeader());

export const getAllProjectsApi = ({ search = "", status = "", page = 1, limit = 10 } = {}) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  return commonApi(`${baseUrl}/projects?${params}`, "GET", {}, authHeader());
};

export const getSingleProjectApi = (id) => commonApi(`${baseUrl}/projects/${id}`, "GET", {}, authHeader());
export const updateProjectApi = (id, data) => commonApi(`${baseUrl}/projects/${id}`, "PUT", data, authHeader());
export const deleteProjectApi = (id) => commonApi(`${baseUrl}/projects/${id}`, "DELETE", {}, authHeader());
