import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Delete, Update, CheckCircle, Error } from "@mui/icons-material";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phno: "",
    address: "",
    group: "",
  });

  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    axios
      .delete(`https://vcf-backend.vercel.app/customer/${formData.id}`)
      .then((res) => {
        console.log(res);
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    axios
      .put("https://vcf-backend.vercel.app/customer", formData)
      .then((res) => {
        console.log(res);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      setErrorMessage("ID is required");
      setSuccess(false);
      return;
    }

    axios
      .post("https://vcf-backend.vercel.app/customer", formData)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
          setErrorMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <Card raised>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
            align="center"
          >
            Customer Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  label="ID"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  label="Address"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  label="Batch Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Snackbar
                  open={created && success === true}
                  autoHideDuration={3000}
                  message="Customer Created"
                  icon={<CheckCircle />}
                />
                <Snackbar
                  open={success === false}
                  autoHideDuration={3000}
                  message={errorMessage || "Customer Creation Failed"}
                  icon={<Error />}
                />
                <Snackbar
                  open={deleted}
                  autoHideDuration={3000}
                  message="Customer Record Deleted"
                  icon={<CheckCircle />}
                />
                <Snackbar
                  open={updated}
                  autoHideDuration={3000}
                  message="Customer Record Updated"
                  icon={<CheckCircle />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircle />}
                  fullWidth
                >
                  Create
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="button"
                  onClick={handleUpdate}
                  variant="contained"
                  color="warning"
                  startIcon={<Update />}
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="button"
                  onClick={handleDelete}
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerForm;
