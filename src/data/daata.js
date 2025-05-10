// const express = require("express");
// const app = express();
// const port = 3000;

// Sample data (in a real app, this would be from a database)
const graphData = {
  monthly: {
    1: {
      totalUserGraph: {
        userData: [
          { name: "January", count: 50 },
          { name: "February", count: 60 },
          { name: "March", count: 45 },
          { name: "April", count: 70 },
          { name: "May", count: 80 },
        ],
        totalCount: 305,
      },
      totalAddsGraph: {
        userData: [
          { name: "January", count: 20 },
          { name: "February", count: 25 },
          { name: "March", count: 18 },
          { name: "April", count: 22 },
          { name: "May", count: 30 },
        ],
        totalCount: 115,
      },
    },
    2: {
      /* Different data for graphFor=2 */
    },
  },
  weekly: {
    1: {
      totalUserGraph: {
        userData: [
          { name: "Week 1", count: 20 },
          { name: "Week 2", count: 25 },
          { name: "Week 3", count: 30 },
          { name: "Week 4", count: 35 },
          { name: "Week 5", count: 25 },
        ],
        totalCount: 135,
      },
      totalAddsGraph: {
        userData: [
          { name: "Week 1", count: 10 },
          { name: "Week 2", count: 12 },
          { name: "Week 3", count: 15 },
          { name: "Week 4", count: 18 },
          { name: "Week 5", count: 10 },
        ],
        totalCount: 65,
      },
    },
    2: {
      /* Different data for graphFor=2 */
    },
  },
};

app.get("/user/changeGraphStatus", (req, res) => {
  const { type, graphFor } = req.query;

  // Ensure valid type and graphFor
  if (!graphData[type] || !graphData[type][graphFor]) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid type or graphFor",
      status: 0,
    });
  }

  // Retrieve the corresponding data for the provided `type` and `graphFor`
  const graphInfo = graphData[type][graphFor];

  // Respond with success and the requested data
  res.json({
    statusCode: 200,
    message: "Success",
    data: graphInfo,
    status: 1,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
