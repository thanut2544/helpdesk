import React, { useState } from "react";
// import { createTicket } from "../services/api";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../services/api";

export const TicketCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('title',title)
      console.log('description',description)
      console.log('contactInfo',contactInfo)
      await createTicket({ title, description, contactInfo });
      navigate("/");
    } catch (error) {
      alert("Failed to create ticket");
    }
  };

  return (
    <Container
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // จัดกึ่งกลางแนวนอน
        justifyContent: "center", // จัดกึ่งกลางแนวตั้ง
        minHeight: "60vh", // ให้กินเต็มความสูงหน้าจอ
      }}
    >
      <Typography variant="h5" mb={2}>
        Create New Ticket
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <TextField
          label="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};
