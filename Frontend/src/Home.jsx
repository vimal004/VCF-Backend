// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportIcon from '@mui/icons-material/Report';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';  // Import the custom theme

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="space-y-6 w-full max-w-md text-center">
          <Link to="allcustomers" className="block mb-4">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<PeopleIcon />}
              sx={{ py: 2 }}
            >
              View Customers Details
            </Button>
          </Link>
          <Link to="managecustomers" className="block mb-4">
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              startIcon={<EditIcon />}
              sx={{ py: 2 }}
            >
              Manage Customer Records
            </Button>
          </Link>
          <Link to="managegroups" className="block mb-4">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<GroupIcon />}
              sx={{ py: 2 }}
            >
              Manage Groups
            </Button>
          </Link>
          <Link to="viewgroups" className="block mb-4">
            <Button
              variant="contained"
              color="info"
              fullWidth
              size="large"
              startIcon={<VisibilityIcon />}
              sx={{ py: 2 }}
            >
              View Groups
            </Button>
          </Link>
          <Link to="defaulters" className="block mb-4">
            <Button
              variant="contained"
              color="error"
              fullWidth
              size="large"
              startIcon={<ReportIcon />}
              sx={{ py: 2 }}
            >
              View Defaulters By Group
            </Button>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;

