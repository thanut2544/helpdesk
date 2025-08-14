import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { TicketDetailPage } from "./pages/TicketDetailPage";
import { TicketCreatePage } from "./pages/TicketCreatePage";

function App(){
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Helpdesk Tickets
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create">
            New Ticket
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ticket/:id" element={<TicketDetailPage />} />
        <Route path="/create" element={<TicketCreatePage />} />
      </Routes>
    </>
  );
};

export default App;
