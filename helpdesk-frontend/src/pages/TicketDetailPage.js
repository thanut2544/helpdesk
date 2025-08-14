import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, MenuItem, Box } from "@mui/material";
import { getTicketById, updateTicket } from "../services/api";

const statuses = ["pending", "accepted", "resolved", "rejected"];

export const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [status, setStatus] = useState("pending");

  const fetchTicket = useCallback(async () => {
    console.log('id',id)
    if (!id) return;
    try {
      const response = await getTicketById(Number(id));
      const ticket = response.data;
      setTitle(ticket.title);
      setDescription(ticket.description);
      setContactInfo(ticket.contactInfo);
      setStatus(ticket.status);
    } catch (error) {
      alert("Ticket not found");
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const handleUpdate = async () => {
    if (!id) return;
    try {
      await updateTicket(Number(id), { title, description, contactInfo, status });
      alert("Ticket updated");
      navigate("/");
    } catch (error) {
      alert("Failed to update ticket");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Edit Ticket
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} required />
        <TextField label="Contact Info" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
        <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} required>
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleUpdate}>
          Save
        </Button>
      </Box>
    </Container>
  );
};
