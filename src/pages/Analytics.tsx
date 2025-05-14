import { useNavigate } from "react-router-dom";
// import MainContainer from "../../layout/MainContainer";
import { styled } from "@mui/material/styles";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import LineChart from "../components/LineChart/LineChart";
// import LineChart from "../../components/LineChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#204e33" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const navigate = useNavigate();

  const graphOrderData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Users",
        data: [
          "10",
          "20",
          "25",
          "15",
          "50",
          "10",
          "20",
          "25",
          "15",
          "50",
          "20",
          "25",
        ],
        borderColor: "#ed5f00",
        backgroundColor: "#ed5f00",
        color: "#FFFFF",
      },
    ],
  };
  const graphDealerData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Ads",
        data: [
          "10",
          "20",
          "25",
          "15",
          "50",
          "10",
          "20",
          "25",
          "15",
          "50",
          "20",
          "25",
        ],
        borderColor: "#ed5f00",
        backgroundColor: "#ed5f00",
        color: "#FFFFF",
      },
    ],
  };
  const graphStoreData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Transaction and Payment",
        data: [
          "10",
          "20",
          "25",
          "15",
          "50",
          "10",
          "20",
          "25",
          "15",
          "50",
          "20",
          "25",
        ],
        borderColor: "#ed5f00",
        backgroundColor: "#ed5f00",
        color: "#FFFFF",
      },
    ],
  };
  // const graphPostsData = {
  //   labels: [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ],
  //   datasets: [
  //     {
  //       label: "Posts",
  //       data: [
  //         "10",
  //         "20",
  //         "25",
  //         "15",
  //         "50",
  //         "10",
  //         "20",
  //         "25",
  //         "15",
  //         "50",
  //         "20",
  //         "25",
  //       ],
  //       borderColor: "#ed5f00",
  //       backgroundColor: "#ed5f00",
  //       color: "#FFFFF",
  //     },
  //   ],
  // };
  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: "black",
          color: "white",
          my: "20px",
        }}
        className={`py-5 m-5  px-3 rounded `}
      >
        Back
      </Button>
      <div className="main_title mb-[20px]">
        <Typography variant="h3">Analytics</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item className="cards" style={{ borderRadius: "15px" }}>
            <div className="flex justify-between p-5">
              <h2 className="mn_hdng">Total Users</h2>
              <select className="bg-white border-1 rounded-[5px]  text-[#1d1d1d]  font-medium text-[13px] h-[35px] p-[0_30px_0_10px] outline-none ">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <LineChart data={graphOrderData} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item className="cards" style={{ borderRadius: "15px" }}>
            <div className="flex justify-between p-5">
              <h2 className="mn_hdng">Ad Performance</h2>
              <select className="bg-white border-1 rounded-[5px]  text-[#1d1d1d]  font-medium text-[13px] h-[35px] p-[0_30px_0_10px] outline-none ">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <LineChart data={graphDealerData} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item className="cards" style={{ borderRadius: "15px" }}>
            <div className="flex justify-between p-5">
              <h2 className="mn_hdng">Transactions and Payments</h2>
              <select className="bg-white border-1 rounded-[5px]  text-[#1d1d1d]  font-medium text-[13px] h-[35px] p-[0_30px_0_10px] outline-none ">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <LineChart data={graphStoreData} />
          </Item>
          {/* <Item className="cards" style={{ borderRadius: "15px" }}>
          <h2 className="mn_hdng">Total Posts</h2>
          <LineChart data={graphPostsData} />
        </Item> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
