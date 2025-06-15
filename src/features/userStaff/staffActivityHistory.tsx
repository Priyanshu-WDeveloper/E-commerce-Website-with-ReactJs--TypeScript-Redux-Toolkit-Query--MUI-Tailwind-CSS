import { Delete, } from "@mui/icons-material";
import {
  TableContainer,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
// import { useNavigate } from "react-router";

const StaffActivityHistory = () => {
  // const navigate = useNavigate();
  return (
    <TableContainer className="table_container">
      <Box className="heading"></Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">S.No</TableCell>
            <TableCell>Activity Performed</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">1</TableCell>
            <TableCell>Visited Riyadh GYM</TableCell>
            <TableCell>10:23</TableCell>
            <TableCell>10-12-23</TableCell>
            <TableCell>
              <Box className="table_actions">
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">2</TableCell>
            <TableCell>Just became an elite member</TableCell>
            <TableCell>12:23</TableCell>
            <TableCell>12-12-23</TableCell>
            <TableCell>
              <Box className="table_actions">
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>{" "}
          <TableRow>
            <TableCell align="center">3</TableCell>
            <TableCell>Logged in to app</TableCell>
            <TableCell>10:23</TableCell>
            <TableCell>10-12-23</TableCell>
            <TableCell>
              <Box className="table_actions">
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaffActivityHistory;
