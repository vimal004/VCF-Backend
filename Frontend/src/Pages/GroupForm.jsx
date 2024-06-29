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

const GroupForm = () => {
  const [formData, setFormData] = useState({
    group: "",
    groupname: "",
    months: "",
    startmonth: "",
  });

  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleDelete = () => {
    axios
      .delete("https://vcf-backend.vercel.app/group", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          group: formData.group,
        },
      })
      .then((res) => {
        console.log(res);
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error deleting group:", err);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`https://vcf-backend.vercel.app/group`, formData)
      .then((res) => {
        console.log(res);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error updating group:", err);
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
    axios
      .post("https://vcf-backend.vercel.app/group", formData)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
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
      <Card raised sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Group Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  label="Group Number"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="groupname"
                  value={formData.groupname}
                  onChange={handleChange}
                  label="Group Name"
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  name="months"
                  value={formData.months}
                  onChange={handleChange}
                  label="Months"
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="startmonth"
                  value={formData.startmonth}
                  onChange={handleChange}
                  label="Starting Month"
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Snackbar
                  open={created && success === true}
                  autoHideDuration={3000}
                  message="Group Created"
                  icon={<CheckCircle />}
                />
                <Snackbar
                  open={success === false}
                  autoHideDuration={3000}
                  message="Group Creation Failed"
                  icon={<Error />}
                />
                <Snackbar
                  open={deleted}
                  autoHideDuration={3000}
                  message="Group Record Deleted"
                  icon={<CheckCircle />}
                />
                <Snackbar
                  open={updated}
                  autoHideDuration={3000}
                  message="Group Record Updated"
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
                  sx={{ borderRadius: 2 }}
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
                  sx={{ borderRadius: 2 }}
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
                  sx={{ borderRadius: 2 }}
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

export default GroupForm;
