import { Delete } from "@mui/icons-material";
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
import React, {  useState } from "react";
import { Activities } from "../../types/General";
import moment from "moment";
import WarnModal from "../../components/modals/WarnModal";
import { handleDelete } from "../../utils/commonFunctions";
import { useDeleteActivityMutation } from "../../services/user";

const ActivityHistoryComponent = ({
  activityData,
  getActivityHistory,
}: {
  activityData: Activities[] | undefined;
  getActivityHistory: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const [deleteById] = useDeleteActivityMutation();

  return (
    <>
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
            {activityData?.length ? (
              activityData?.map((item, index) => (
                <TableRow key={item?._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{item?.description || "-"}</TableCell>
                  <TableCell>
                    {moment(item?.createdAt).format("hh:mm a")}
                  </TableCell>
                  <TableCell>
                    {moment(item?.createdAt).format("DD-MM-YY")}
                  </TableCell>
                  <TableCell>
                    <Box className="table_actions">
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            setSelectedId(item?._id);
                            setOpen(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align={"center"} colSpan={9}>
                  No Activities Found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <WarnModal
        setOpen={setOpen}
        open={open}
        name="activity"
        handleDelete={() => {
          handleDelete(deleteById, selectedId, getActivityHistory);
        }}
      />
    </>
  );
};

export default ActivityHistoryComponent;
