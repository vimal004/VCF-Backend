import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Snackbar } from "@mui/material";
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
    axios
      .post("https://vcf-backend.vercel.app/customer", formData)
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
        // Handle error states, show user an error message
      });
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer Form</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          label="ID"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        <TextField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        <TextField
          type="text"
          name="phno"
          value={formData.phno}
          onChange={handleChange}
          label="Phone Number"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        <TextField
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          label="Address"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        <TextField
          type="text"
          name="group"
          value={formData.group}
          onChange={handleChange}
          label="Batch Number"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        <Snackbar
          open={created && success === true}
          autoHideDuration={3000}
          message="Customer Created"
          icon={<CheckCircle />}
        />
        <Snackbar
          open={success === false}
          autoHideDuration={3000}
          message="Customer Creation Failed"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<CheckCircle />}
          className="w-full mt-4"
        >
          Create
        </Button>
        <Button
          type="button"
          onClick={handleUpdate}
          variant="contained"
          color="warning"
          startIcon={<Update />}
          className="w-full mt-4"
        >
          Update
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          variant="contained"
          color="error"
          startIcon={<Delete />}
          className="w-full mt-4"
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

export default CustomerForm;
