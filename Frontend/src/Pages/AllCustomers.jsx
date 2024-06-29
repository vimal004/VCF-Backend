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

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    group: "",
  });

  useEffect(() => {
    axios
      .get("https://vcf-backend.vercel.app/customers")
      .then((response) => {
        setCustomers(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      (filter.group === "" || customer.group === parseInt(filter.group, 10)) &&
      (filter.name === "" ||
        customer.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  });

  return (
    <Box sx={{ maxWidth: "80%", mx: "auto", mt: 5 }}>
      <Card raised sx={{ borderRadius: 3, padding: 3, bgcolor: "white" }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              color: "black",
              marginBottom: 2,
            }}
          >
            Customer Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
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
              sx={{
                marginRight: 2,
                borderRadius: 2,
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontFamily: "Roboto, sans-serif",
                },
              }}
            />
            <TextField
              name="name"
              type="text"
              value={filter.name}
              placeholder="Search Customer By Name"
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
              sx={{
                borderRadius: 2,
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontFamily: "Roboto, sans-serif",
                },
              }}
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
                    Customer Name
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
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "whitesmoke" },
                      }}
                    >
                      <TableCell>
                        <Link
                          to={`/customers/${customer.id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {customer.id}
                        </Link>
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phno}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.group}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" color="error">
                        No Customer Record Found
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

export default AllCustomers;
