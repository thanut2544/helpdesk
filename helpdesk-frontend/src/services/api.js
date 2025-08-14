import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // เปลี่ยนตาม backend URL จริง
});

export const getTickets = (params) => api.get("/tickets", { params });
export const getTicketById = (id) => api.get(`/tickets/${id}`);
export const createTicket = (data) => api.post("/tickets", data);
export const updateTicket = (id, data) => api.post(`/tickets/${id}`, data);
