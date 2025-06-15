import React, { useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Switch,
  Button,
  Tooltip,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router";
// import SearchBar from "../../components/SearchBar";
// import { showError, showToast } from "../../helpers/toast";

import {
  useLazyGetUsersQuery,
  useDeleteUserByIdMutation,
  //   useLazyGetUserListQuery,
  //   useChangeUserStatusMutation,
  //   useLazyGetUserCSVQuery,
} from "../../services/Users";
import { UserResponse } from "../../types/User";
import useAuth from "../../hooks/useAuth";
import { useErrorToast, useToast } from "../../helpers/toasts/useToast";
import LoadingBackdrop from "../../components/Backdrop";
// import { UserResponse } from "../../types/User";
// import { generateEncryptedKeyBody } from "../../utils/crypto";
// import WarnModal from "../../components/modals/WarnModal";
// import Pagination from "../../components/Pagination";
// import { isValidInput } from "../../utils/validations";
// import Loader from "../../helpers/Loader";
// import { handleDelete } from "../../utils/commonFunctions";
// import LoadingBar from "react-top-loading-bar";
// import { isDeleteAllowed, isEditAllowed } from "../../utils/permissonAllowed";
import { ROLES } from "../../utils/enums";
import moment from "moment";
import WarnModal from "../../components/modals/WarnModal";
import { handleDelete } from "../../utils/commonFunctions";
import { isDeleteAllowed, isEditAllowed } from "../../utils/permissionAllowed";
// import useAuth from "../../hooks/useAuth";

interface Permissions {
  label: string;
  isView: boolean;
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

const ManageUsers = () => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const ref: any = useRef(null);

  //   const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [hidePermission, setHidePermission] = useState<any>();
  const userData = useAuth();
  const [getUsers, { isLoading }] = useLazyGetUsersQuery();
  //   const [updateUserStatus] = useChangeUserStatusMutation();
  const [deleteById] = useDeleteUserByIdMutation();
  const showToast = useToast();
  const showError = useErrorToast();

  const totalPages = Math.ceil(totalCount / 10);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getUsersList = async () => {
    // setIsLoading(true);
    ref?.current?.continuousStart();

    try {
      const response = await getUsers({
        limit: 10,
        skip: 0,
        // page,
        // role: ROLES.USER,
        // search: debouncedSearchTerm.trim(),
      }).unwrap();
      // console.log("response in manageUsers", response);

      if (response?.statusCode === 200) {
        setUsers(response?.data?.list || []);
        setTotalCount(response?.data?.totalCount || 1);
        // setUsers(response?.data?.list || []);
      } else {
        setUsers([]);
      }
    } catch (error: any) {
      showError(error?.data?.message || "");
      // showError(error?.data?.message || "");
    }
    // setIsLoading(false);
    ref?.current?.complete();
  };

  //   const [getUserCsvMethod] = useLazyGetUserCSVQuery();

  //   const handleExportCsv = async () => {
  //     try {
  //       const res = await getUserCsvMethod({
  //         search: searchTerm,
  //         role: ROLES.USER,
  //       }).unwrap();
  //       if (res?.statusCode === 200) {
  //         window.open(res?.data || "");
  //       }
  //     } catch (error: any) {
  //       showError(error?.message);
  //     }
  //   };

  const handleStatusChange = async (index: number) => {
    try {
      const body = {
        isBlocked: !users[index]?.isBlocked,
      };
      console.log(body);
      // const encryptedData = generateEncryptedKeyBody(body);
      // const response = await updateUserStatus({
      //   id: `${users[index]._id}`,
      //   body: encryptedData,
      // }).unwrap();
      // if (response?.statusCode == 200) {
      //   showToast(
      //     users[index]?.isBlocked
      //       ? "User enabled successfully"
      //       : "User disabled successfully"
      //   );
      //   setUsers((prevData: any) => {
      //     const temp = [...prevData];
      //     temp[index] = { ...temp[index], isBlocked: !temp[index].isBlocked };
      //     return temp;
      //   });
      // }
      showToast("Status change functionality not implemented yet");
    } catch (error: any) {
      showError(error?.data?.message || "");
    }
  };
  // console.log("userData", userData);

  const checkPermission = () => {
    // const permission = userData?.accessRole?.permission;

    const permission = Object.values(userData?.roles || {}).includes(
      ROLES.ADMIN
    );
    console.log(permission);
    if (permission) {
      // if (permission?.length) {
      // let idx = -1;
      // idx = permission?.findIndex(
      //   (ele: Permissions) => ele?.label === "Manage Users"
      // );
      // if (idx > -1) {
      setHidePermission(permission);
    } else {
      navigate(-1);
    }
  };
  // console.log("userData", userData);

  useEffect(() => {
    const roles = userData?.roles;
    const hasAdmin = Object.values(roles || {}).includes(ROLES.ADMIN);

    if (hasAdmin) {
      // if (userData?.roles === ROLES.ADMIN) {
      console.log("Permission Granted");

      checkPermission();
      // setList(sideBarData);
    } else {
      console.log(" Permission Denied");
    }
  }, []);
  // useEffect(() => {
  //   if (typeof hidePermission !== "undefined") {
  //     if (!hidePermission?.isView) {
  //       console.log(hidePermission);
  //       navigate("/permission-denied", { replace: true });
  //     }
  //   }
  //   console.log("hidePermission", hidePermission);
  //   console.log(hidePermission);
  // }, [hidePermission, userData]);

  useEffect(() => {
    getUsersList();
    //   }, [debouncedSearchTerm, page]);
  }, []);
  if (isLoading) {
    return <LoadingBackdrop />;
  }
  return (
    <Container>
      <>
        {/* <Loader isLoad={isLoading} /> */}
        {/* <LoadingBar color="#7048c1" ref={ref} shadow={true} /> */}

        <div className="main_loyout ">
          <div className="mb-[25px] flex items-center justify-between gap-[30px] ">
            <h1 className=" text-[40px]/[1.3] m-0 font-bold tracking-[0.5px] ">
              Manage Users
            </h1>
          </div>
          <Card className="m-5 p-5 shadow-md rounded-[10px] text-black overflow-visible bg-white">
            <Box className="cards_header">
              {/* <SearchBar
              searchTerm={searchTerm}
              setDebouncedSearchTerm={setDebouncedSearchTerm}
              value={searchTerm}
              onCross={() => setSearchTerm("")}
              onChange={(val: any) => {
                if (isValidInput(val.target.value)) {
                  setSearchTerm(val.target.value);
                }
              }}
            /> */}
              <Box className="cards_header_right">
                {/* <Button className="btn btn_primary" onClick={handleExportCsv}>
                <FileDownloadIcon /> Export CSV
              </Button> */}
              </Box>
            </Box>
            <TableContainer className="mt-5 rounded-[10px]">
              <Box className="flex items-center justify-between"></Box>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S.No</TableCell>
                    <TableCell>Picture</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Full name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Registration Date</TableCell>
                    {/* <TableCell>Disable Account</TableCell> */}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Uncomment and use the below block for dynamic data */}
                  {users?.length ? (
                    users.map((row: any, i: number) => (
                      <TableRow key={row._id}>
                        <TableCell align="center">
                          {(page - 1) * 10 + i + 1}
                        </TableCell>
                        <TableCell>
                          <img
                            className="w-[50px] h-[50px] rounded-full object-cover object-center"
                            src={
                              row?.image ??
                              "/static/images/user_placeholder.png"
                            }
                            alt="User"
                          />
                          {/* <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          src={
                            row?.image
                              ? row.image
                              : "/static/images/user_placeholder.png"
                          }
                        /> */}
                        </TableCell>
                        <TableCell>
                          {row.username ? row.username : "-"}
                        </TableCell>
                        <TableCell autoCapitalize="on">{`${
                          row?.firstName || "-"
                        } ${row?.lastName || "-"}`}</TableCell>
                        <TableCell>{row.email ? row.email : "-"}</TableCell>
                        <TableCell>
                          {row.nationalNumber
                            ? row?.countryCode + " " + row.nationalNumber
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {row?.createdAt
                            ? moment(row?.createdAt).format("DD-MM-YYYY")
                            : "-"}
                        </TableCell>
                        {/* <TableCell>
                          <Switch
                            {...label}
                            checked={row?.isBlocked}
                            size="small"
                            //   disabled={isEditAllowed(0) ? false : true}
                            onChange={() => handleStatusChange(i)}
                          />
                        </TableCell> */}
                        <TableCell>
                          <Box className="inline-flex items-center gap-[10px]">
                            <Tooltip title="View">
                              <IconButton
                                onClick={() =>
                                  navigate("/manage-users/details/" + row?._id)
                                }
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip title="View">
    <IconButton className="h-[35px] w-[35px] p-0 min-w-[35px] rounded-full bg-white text-black border border-[#dedede] shadow-[0px_0px_2px_4px_#0000000d] transition-transform hover:scale-110">
      <VisibilityIcon className="text-[18px]" />
    </IconButton>
  </Tooltip> */}
                            {hidePermission?.isAdd ||
                            Object.values(userData?.roles || {}).includes(
                              ROLES.ADMIN
                            )
                              ? isEditAllowed(0) && (
                                  <Tooltip title="Edit">
                                    <IconButton
                                      onClick={() =>
                                        navigate(
                                          "/manage-users/edit/" + row?._id,
                                          { state: hidePermission }
                                        )
                                      }
                                    >
                                      <ModeEditIcon />
                                    </IconButton>
                                  </Tooltip>
                                )
                              : null}
                            {hidePermission?.isDelete ||
                            // userData?.roles === ROLES.ADMIN
                            Object.values(userData?.roles || {}).includes(
                              ROLES.ADMIN
                            )
                              ? isDeleteAllowed(0) && (
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={() => {
                                        setOpen(true);
                                        setSelectedId(row._id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                )
                              : null}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align={"center"} colSpan={9}>
                        No Users Found!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          {/* <Pagination
          module={users}
          page={page}
          onPageChange={onPageChange}
          totalPages={totalPages}
        /> */}
          <WarnModal
            setOpen={setOpen}
            open={open}
            name={"user"}
            handleDelete={() =>
              handleDelete(
                deleteById,
                selectedId,
                getUsersList,
                showToast,
                showError
              )
            }
          />
        </div>
      </>
    </Container>
  );
};

export default ManageUsers;
