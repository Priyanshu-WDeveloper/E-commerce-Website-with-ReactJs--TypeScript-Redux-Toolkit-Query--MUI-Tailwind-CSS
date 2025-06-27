import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography } from "@mui/material";
// import {
//   useLazyGetActivityHistoryQuery,
//   useLazyGetCommunityForumQuery,
//   useLazyGetUsersByIdQuery,
// } from "../../services/user";
import UserDetailComponent from "../../features/userStaff/userDetail";
// import ActivityHistoryComponent from "../../features/userStaff/activityHistory";
// import ContentUploadComponent from "../../features/userStaff/contentUpload";
// import { Activities, Contents } from "../../types/General";
// import Loader from "../../helpers/Loader";
import LoadingBackdrop from "../../components/Backdrop";
import { useLazyGetUserByIdQuery } from "../../services/users";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams() || 0;
  const [getDataById] = useLazyGetUserByIdQuery();
  //   const [activityHistoryMethod] = useLazyGetActivityHistoryQuery();
  //   const [contentMethod] = useLazyGetCommunityForumQuery();

  const [userDetailsData, setUserDetailsData] = useState<any>({});
  // const [activityData, setActivityData] = useState<Activities[]>([]);
  // const [contentData, setContentData] = useState<Contents[]>([]);
  const [value, setValue] = useState(0);
  // const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const getDataByIdList = async () => {
    try {
      setLoading(true);
      const response = await getDataById({ id }).unwrap();
      // console.log("response in detail Users", response);

      setLoading(false);
      if (response.statusCode === 200) {
        setUserDetailsData(response?.data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // const getActivityHistory = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await activityHistoryMethod({
  //       userId: id,
  //       page: 1,
  //       limit: 20,
  //       search: "",
  //     }).unwrap();
  //     setLoading(false);
  //     if (response.statusCode == 200) {
  //       setActivityData(response?.data?.list);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  // const getContentData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await contentMethod({
  //       userId: id,
  //       page: 1,
  //       limit: 20,
  //       search: "",
  //       type: selectedTab === 0 ? "community" : "post",
  //     }).unwrap();
  //     setLoading(false);
  //     if (response.statusCode == 200) {
  //       setContentData(response?.data?.list);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (id) {
      getDataByIdList();
      // getActivityHistory();
    }
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     getContentData();
  //   }
  //   }, [id, selectedTab]);

  if (loading) {
    return <LoadingBackdrop />;
  }
  return (
    <>
      <div className="main_loyout">
        <div className=" mb-[25px] flex items-center justify-between gap-[30px] ">
          {/* <Loader isLoad={loading} /> */}
          <h1 className="text-[20px]/1.3 m-0 font-extrabold text-[#1d1d1d]">
            View User Profile
          </h1>
          <Button
            className="h-[43px] py-[5px] px-[15px] text-[14px] font-bold shadow-none capitalize  gap-[5px] rounded hover:shadow-none text-[#fff] bg-[#1d1d1d] hover:bg-[#0000002e] hover:text-[#1d1d1d] "
            onClick={() => {
              navigate("/manage-users");
            }}
          >
            Back
          </Button>
        </div>
        <Card className="m-5 p-5 shadow-md rounded-[10px] text-black overflow-visible bg-white">
          <Box className="custom_tabs">
            <Box className="flex justify-between items-center">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="basic tabs example"
                className="mb-[20px]"
              >
                <Tab label="User Details" {...a11yProps(0)} />
                <Tab label="Activity History" {...a11yProps(1)} />
                {/* <Tab label="Content Uploaded" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <UserDetailComponent userDetailsData={userDetailsData} />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
              <ActivityHistoryComponent
                activityData={activityData}
                getActivityHistory={getActivityHistory}
              />
            </CustomTabPanel> */}
            {/* <CustomTabPanel value={value} index={2}>
              <ContentUploadComponent
                value={selectedTab}
                setValue={setSelectedTab}
                contentData={contentData}
                getContentData={getContentData}
              />
            </CustomTabPanel> */}
          </Box>
        </Card>
      </div>
    </>
  );
};

export default UserDetails;
