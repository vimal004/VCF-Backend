import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const Transaction = () => {
  const { customerid } = useParams();
  const [customers, setCustomers] = useState(null);
  const [filteredCustomer, setFilteredCustomer] = useState({});
  const [tdat, setTdat] = useState(null);
  const [gdat, setGdat] = useState(null);
  const [s, sets] = useState(null);

  // State for input values in each row
  const [inputValues, setInputValues] = useState([]);
  const [existvalues, setexistvalues] = useState(null);

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

  useEffect(() => {
    axios
      .get("https://vcf-backend.vercel.app/group")
      .then((response) => {
        setTdat(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching group:", error);
      });
  }, []);

  useEffect(() => {
    if (tdat && filteredCustomer) {
      const filteredGroup = tdat.find((d) => d.group == filteredCustomer.group);
      setGdat(filteredGroup);
    }
  }, [tdat, filteredCustomer]);

  useEffect(() => {
    if (customers) {
      const customer = customers.find((customer) => customer.id === customerid);
      setFilteredCustomer(customer || {});
    }
  }, [customers, customerid]);

  useEffect(() => {
    axios
      .get(`https://vcf-backend.vercel.app/group/transaction`, {
        params: { id: customerid },
      })
      .then((res) => {
        setexistvalues(res?.data?.data?.data);
      })
      .catch((err) => {
        axios
          .post("https://vcf-backend.vercel.app/group/transaction", {
            id: customerid,
            data: inputValues,
          })
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [customerid]);

  useEffect(() => {
    console.log("Existing values: ", existvalues);
  }, [existvalues]);

  useEffect(() => {
    if (gdat && existvalues) {
      setInputValues(
        Array.from({ length: gdat.months }, (_, index) => ({
          auctionDate: existvalues[index]?.auctionDate || "",
          dueDate: existvalues[index]?.dueDate || "",
          remainingAmount: existvalues[index]?.remainingAmount || "",
          dueAmount: existvalues[index]?.dueAmount || "", // New field
          paidAmount: existvalues[index]?.paidAmount || "", // New field
          status: existvalues[index]?.status || "Pending", // Default status to Pending if not set
        }))
      );
      console.log(inputValues);
    }
  }, [gdat, existvalues]);

  // Handle input change
  const handleInputChange = (e, rowIndex, field) => {
    const { value } = e.target;
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[rowIndex][field] = value;
      return newValues;
    });
    console.log(inputValues);
  };

  const handleupdate = () => {
    axios
      .put("https://vcf-backend.vercel.app/group/transaction", {
        id: customerid,
        data: inputValues,
      })
      .then((res) => {
        console.log(res);
        sets(true);
        setTimeout(() => {
          sets(null);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Transaction Page</h1>
      {gdat ? (
        <h6 className="text-2xl font-bold text-center mb-8">
          {gdat.groupname}
        </h6>
      ) : (
        <h1></h1>
      )}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p className="mt-2">
          <strong>ID:</strong> {customerid}
        </p>
        <p className="mt-2">
          <strong>Name:</strong> {filteredCustomer.name || "N/A"}
        </p>
        <p className="mt-2">
          <strong>Phone:</strong> {filteredCustomer.phno || "N/A"}
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full bg-white border border-gray-300">
          <TableHead>
            <TableRow>
              <TableCell className="border border-gray-300 px-4 py-2">
                Month
              </TableCell>
              <TableCell className="border border-gray-300 px-6 py-2">
                Auction Date
              </TableCell>
              <TableCell className="border border-gray-300 px-8 py-2">
                Due Date
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-2">
                Remaining Amount
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-2">
                Due Amount
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-2">
                Paid Amount
              </TableCell>
              <TableCell className="border border-gray-300 px-12 py-2">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gdat && gdat.months > 0 ? (
              Array.from({ length: gdat.months }, (_, index) => {
                // Calculate the month index based on startmonth
                const startMonthIndex = new Date(
                  gdat.startmonth + "/1/2000"
                ).getMonth();
                const currentMonthIndex = (startMonthIndex + index) % 12;
                const currentMonthName = new Intl.DateTimeFormat("en-US", {
                  month: "long",
                }).format(new Date(2000, currentMonthIndex, 1));

                return (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      {currentMonthName}
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      <Input
                        type="text"
                        value={inputValues[index]?.auctionDate || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "auctionDate")
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      <Input
                        type="text"
                        value={inputValues[index]?.dueDate || ""}
                        onChange={(e) => handleInputChange(e, index, "dueDate")}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      <Input
                        type="text"
                        value={inputValues[index]?.remainingAmount || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "remainingAmount")
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      <Input
                        type="text"
                        value={inputValues[index]?.dueAmount || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "dueAmount")
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      <Input
                        type="text"
                        value={inputValues[index]?.paidAmount || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "paidAmount")
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      <Select
                        value={inputValues[index]?.status || ""}
                        onChange={(e) => handleInputChange(e, index, "status")}
                        fullWidth
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Defaulter">Unpaid</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className="border border-gray-300 px-4 py-2"
                  colSpan="7"
                >
                  N/A
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="m-4">
        {s && (
          <Typography variant="body1" className="text-green-500 m-3">
            Updation Successful
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleupdate}
          className="m-5"
        >
          Update Details
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
