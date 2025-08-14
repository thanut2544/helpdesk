import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getTickets } from "../services/api";

const statuses = ["pending", "accepted", "resolved", "rejected"];

export const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("latestUpdate");

  useEffect(() => {
    fetchTickets();
  }, [filterStatus, sortBy]);

  const fetchTickets = async () => {
    const params = {};
    if (filterStatus) {
      params.status = filterStatus;
    } else {
      params.status = "all";
    }
    if (sortBy) params.sort = sortBy;

    try {
      const response = await getTickets(params);
      setTickets(response.data.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          label="Status"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="latestUpdate">Latest Update</MenuItem>
        </Select>
      </FormControl>

      <Table sx={{ marginTop: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              component={Link}
              to={`/ticket/${ticket.id}`}
              sx={{ cursor: "pointer", textDecoration: "none" }}
            >
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                {new Date(ticket.latestUpdate).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
