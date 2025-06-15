import moment from "moment";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";

const StaffDetailComponent = ({
  userDetailsData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userDetailsData: any;
}) => {
  return (
    <Card className="cards">
      <CardContent sx={{ p: 1 }}>
        <Grid container spacing={2} className="view_box">
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <figure className="profile_img">
              <img
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
                  <Typography component="h5">Username</Typography>
                  <Typography component="p">
                    {userDetailsData?.userName
                      ? userDetailsData?.userName
                      : "-"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography component="h5">Phone Number</Typography>
                  <Typography component="p">
                    {userDetailsData?.phone
                      ? userDetailsData?.countryCode +
                        " " +
                        userDetailsData?.phone
                      : "-"}
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StaffDetailComponent;
