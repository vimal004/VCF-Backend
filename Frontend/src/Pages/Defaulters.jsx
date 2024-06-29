import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";

const Defaulters = () => {
  const [defaulters, setDefaulters] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    group: "",
  });

  useEffect(() => {
    const fetchDefaulters = async () => {
      try {
        const defaultersResponse = await axios.get(
          "https://vcf-backend.vercel.app/group/defaulters"
        );
        const defaulterIds = defaultersResponse.data.map(
          (defaulter) => defaulter.id
        );

        const customersResponse = await axios.get(
          "https://vcf-backend.vercel.app/customers"
        );
        const defaulterCustomers = customersResponse.data.data.filter(
          (customer) => defaulterIds.includes(customer.id)
        );

        setDefaulters(defaulterCustomers);
      } catch (error) {
        console.error("Error fetching defaulters or customers:", error);
      }
    };

    fetchDefaulters();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredDefaulters = defaulters.filter((defaulter) => {
    return (
      (filter.group === "" || defaulter.group === parseInt(filter.group, 10)) &&
      (filter.name === "" ||
        defaulter.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  });

  return (
    <Box sx={{ maxWidth: "80%", mx: "auto", mt: 5 }}>
      <Card raised sx={{ borderRadius: 3, bgcolor: "white" }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            Defaulter Details
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <TextField
              name="group"
              value={filter.group}
              type="number"
              placeholder="Filter By Group"
              onChange={handleFilterChange}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginRight: 2, borderRadius: 2 }}
            />
            <TextField
              name="name"
              type="text"
              value={filter.name}
              placeholder="Search Defaulter By Name"
              onChange={handleFilterChange}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightgrey" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Roboto, sans-serif",
                      color: "black",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Roboto, sans-serif",
                      color: "black",
                    }}
                  >
                    Defaulter Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Roboto, sans-serif",
                      color: "black",
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Roboto, sans-serif",
                      color: "black",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Roboto, sans-serif",
                      color: "black",
                    }}
                  >
                    Group Number
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDefaulters.length > 0 ? (
                  filteredDefaulters.map((defaulter) => (
                    <TableRow key={defaulter.id}>
                      <TableCell>
                        <Link
                          to={`/customers/${defaulter.id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {defaulter.id}
                        </Link>
                      </TableCell>
                      <TableCell>{defaulter.name}</TableCell>
                      <TableCell>{defaulter.phno}</TableCell>
                      <TableCell>{defaulter.address}</TableCell>
                      <TableCell>{defaulter.group}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" color="error">
                        No Defaulter Record Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Defaulters;
