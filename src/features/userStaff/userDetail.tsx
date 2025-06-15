/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";

function UppperCaseLetter(username: string) {
  return username.charAt(0).toUpperCase() + username.slice(1);
}
const UserDetailComponent = ({ userDetailsData }: { userDetailsData: any }) => {
  return (
    <Card className="m-5 p-5 shadow-md rounded-[10px] text-black overflow-visible bg-white">
      <CardContent sx={{ p: 1 }}>
        <Grid container spacing={2} className="view_box">
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <figure className="h-[100px] w-[100px] rounded-full m-0 ">
              <img
                className="h-[100%] w-[100%] rounded-full object-cover "
                src={
                  userDetailsData?.image
                    ? userDetailsData?.image
                    : "/static/images/user_placeholder.png"
                }
                alt=""
              />
            </figure>
          </Grid>
          <Grid item xs={10} className="view_box_list">
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">First Name</Typography>
                  <Typography component="p">
                    {userDetailsData?.firstName
                      ? userDetailsData?.firstName
                      : "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Last Name</Typography>
                  <Typography component="p">
                    {userDetailsData?.lastName
                      ? userDetailsData?.lastName
                      : "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">User Name</Typography>
                  <Typography component="p">
                    {userDetailsData?.username
                      ? UppperCaseLetter(userDetailsData?.username)
                      : "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Phone no</Typography>
                  <Typography component="p">
                    {userDetailsData?.nationalNumber
                      ? userDetailsData?.countryCode +
                        " " +
                        userDetailsData?.nationalNumber
                      : "-"}
                    {/* {userDetailsData?.phone
                      ? userDetailsData?.countryCode +
                        " " +
                        userDetailsData?.phone
                      : "-"} */}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Email</Typography>
                  <Typography component="p">
                    {userDetailsData?.email ? userDetailsData?.email : "-"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Bio</Typography>
                  <Typography component="p">
                    {userDetailsData?.bio || "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">DOB</Typography>
                  <Typography component="p">
                    {userDetailsData?.dob
                      ? moment(userDetailsData?.dob).format("DD MMMM YYYY")
                      : "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Registration Date</Typography>
                  <Typography component="p">
                    {userDetailsData?.createdAt
                      ? moment(userDetailsData?.createdAt).format(
                          "DD MMMM YYYY"
                        )
                      : "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Account Status</Typography>
                  <Typography component="p">
                    {userDetailsData?.isBlocked ? "Inactive" : "Active"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={2} className="view_box">
            <Grid item lg={2} md={2} sm={6} xs={12}>
              <Box>
                {userDetailsData?.qrImage?.length ? (
                  <figure className="h-[100px] w-[100px] rounded-full m-0 ">
                    <img
                      className="h-[100%] w-[100%] rounded-full object-cover "
                      src={
                        userDetailsData?.qrImage
                          ? userDetailsData?.qrImage
                          : "/static/images/user_placeholder.png"
                      }
                      alt=""
                    />
                  </figure>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserDetailComponent;
