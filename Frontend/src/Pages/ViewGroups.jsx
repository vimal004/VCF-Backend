import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://vcf-backend.vercel.app/group")
      .then((response) => {
        setGroups(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "80%", mx: "auto", mt: 10 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight={"bold"}>
        Groups
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightgrey" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Group Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Group</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Months</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.length > 0 ? (
              groups.map((group) => (
                <TableRow key={group._id}>
                  <TableCell>{group.groupname}</TableCell>
                  <TableCell>{group.group}</TableCell>
                  <TableCell>{group.months}</TableCell>
                  <TableCell>{group.startmonth}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="error">
                    No Group Record Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewGroups;
