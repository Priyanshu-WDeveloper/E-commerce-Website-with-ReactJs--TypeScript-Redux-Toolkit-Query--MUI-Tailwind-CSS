import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}
const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          "https://randomuser.me/api/?results=5"
        );
        // console.log(response.data);
        const data = response.data;

        const authorsData = data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorsData);
      })();
    } catch (error) {
      console.log("Error Fetching Products", error);
    }
  }, []);
  const handleFollowClick = (index: number) => {
    setAuthors((prevAuther) =>
      prevAuther.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };
  return (
    <Box sx={{ boxShadow: 2 }} className=" bg-white p-5 w-[21rem] rounded ">
      <Typography sx={{ fontWeight: "bold", mb: "10px" }} variant="h5">
        Top Sellers
      </Typography>
      <ul>
        {authors.map((author, index) => (
          <li key={index} className=" flex items-center justify-between mb-4 ">
            <section className=" flex justify-center items-center ">
              <img
                src={author.image}
                alt={author.name}
                className=" w-[25%] h-[25%] justify-center rounded-full "
              />
              <span className="ml-4">{author.name}</span>
            </section>
            <Button
              variant="contained"
              onClick={() => handleFollowClick(index)}
              sx={{
                backgroundColor: author.isFollowing ? "red" : "black",
                color: "white",
              }}
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default TopSellers;
