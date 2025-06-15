// import { Delete, Visibility } from "@mui/icons-material";
// import {
//   TableContainer,
//   Box,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Tooltip,
//   IconButton,
//   Tab,
//   Tabs,
//   Typography,
// } from "@mui/material";
// import React, { Dispatch, SetStateAction, useState } from "react";
// import { useNavigate } from "react-router";
// import { Contents } from "../../types/General";
// import moment from "moment";
// import { useDeletePostMutation } from "../../services/user";
// import WarnModal from "../../components/modals/WarnModal";
// import { handleDelete } from "../../utils/commonFunctions";
// import { useDeleteCommunityMutation } from "../../services/communityForum";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const ContentUploadComponent = ({
//   value,
//   setValue,
//   contentData,
//   getContentData,
// }: {
//   value: number;
//   setValue: Dispatch<SetStateAction<number>>;
//   contentData: Contents[] | undefined;
//   getContentData: () => void;
// }) => {
//   const navigate = useNavigate();

//   const [open, setOpen] = useState<boolean>(false);
//   const [selectedId, setSelectedId] = useState<string>("");

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   const [deletePostById] = useDeletePostMutation();
//   const [deleteById] = useDeleteCommunityMutation();

//   return (
//     <>
//       <Box className="custom_tabs">
//         <Box className="flx_sc">
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             aria-label="basic tabs example"
//             className="custom_tabs_links"
//           >
//             <Tab label="Community Forum" {...a11yProps(0)} />
//             <Tab label="Posts" {...a11yProps(1)} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}>
//           <TableContainer className="table_container">
//             <Box className="heading"></Box>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center">S.No</TableCell>
//                   <TableCell>Content Thumbnail</TableCell>
//                   {/* <TableCell>Title</TableCell> */}
//                   <TableCell>Description</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Likes</TableCell>
//                   <TableCell>Comments</TableCell>
//                   <TableCell>Upload Date</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {contentData?.length ? (
//                   contentData?.map((item, index) => (
//                     <TableRow>
//                       <TableCell align="center">{index + 1}</TableCell>
//                       <TableCell align="center">
//                         <img
//                           style={{
//                             width: "50px",
//                             height: "50px",
//                             // borderRadius: "50%",
//                           }}
//                           src={
//                             item?.uploads?.[0]?.link ||
//                             "/static/images/banner-placeholder.png"
//                           }
//                           alt="User 1"
//                         />
//                       </TableCell>
//                       <TableCell>{item?.description || "-"}</TableCell>
//                       {/* <TableCell>{"Video"}</TableCell>
//                         <TableCell>0 Likes</TableCell>
//                         <TableCell>0 Comments</TableCell> */}
//                       <TableCell>{"-"}</TableCell>
//                       <TableCell>{"-"}</TableCell>
//                       <TableCell>{"-"}</TableCell>
//                       <TableCell>
//                         {moment(item?.createdAt)?.format("DD-MM-YY")}
//                       </TableCell>

//                       <TableCell>
//                         <Box className="table_actions">
//                           <Tooltip title="View">
//                             <IconButton
//                               onClick={() => {
//                                 navigate(
//                                   `/community-forum/details/${item?._id}`
//                                 );
//                               }}
//                             >
//                               <Visibility />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <IconButton
//                               onClick={() => {
//                                 setSelectedId(item?._id);
//                                 setOpen(true);
//                               }}
//                             >
//                               <Delete />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell align={"center"} colSpan={9}>
//                       No Community Forum Found!
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <TableContainer className="table_container">
//             <Box className="heading"></Box>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center">S.No</TableCell>
//                   <TableCell>Post Thumbnail</TableCell>
//                   <TableCell>Caption</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Likes</TableCell>
//                   <TableCell>Comments</TableCell>
//                   <TableCell>Upload Date</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {contentData?.length ? (
//                   contentData?.map((item, index) => (
//                     <TableRow>
//                       <TableCell align="center">{index + 1}</TableCell>
//                       <TableCell align="center">
//                         <img
//                           style={{
//                             width: "50px",
//                             height: "50px",
//                             // borderRadius: "50%",
//                           }}
//                           src={
//                             item?.uploads?.[0]?.link ||
//                             "/static/images/banner-placeholder.png"
//                           }
//                           alt="User 1"
//                         />
//                       </TableCell>
//                       <TableCell>{item?.caption || "-"}</TableCell>
//                       {/* <TableCell>{"Video"}</TableCell>
//                         <TableCell>0 Likes</TableCell>
//                         <TableCell>0 Comments</TableCell> */}
//                       <TableCell>{"-"}</TableCell>
//                       <TableCell>{"-"}</TableCell>
//                       <TableCell>{"-"}</TableCell>
//                       <TableCell>
//                         {moment(item?.createdAt)?.format("DD-MM-YY")}
//                       </TableCell>

//                       <TableCell>
//                         <Box className="table_actions">
//                           {/* <Tooltip title="View">
//                               <IconButton
//                                 onClick={() => {
//                                   navigate("/manage-users/details/id");
//                                 }}
//                               >
//                                 <Visibility />
//                               </IconButton>
//                             </Tooltip> */}
//                           <Tooltip title="Delete">
//                             <IconButton
//                               onClick={() => {
//                                 setSelectedId(item?._id);
//                                 setOpen(true);
//                               }}
//                             >
//                               <Delete />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell align={"center"} colSpan={9}>
//                       No Posts Found!
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CustomTabPanel>
//       </Box>
//       <WarnModal
//         setOpen={setOpen}
//         open={open}
//         name={value === 0 ? "Community forum" : "post"}
//         handleDelete={() => {
//           handleDelete(
//             value === 0 ? deleteById : deletePostById,
//             selectedId,
//             getContentData
//           );
//         }}
//       />
//     </>
//   );
// };

// export default ContentUploadComponent;
