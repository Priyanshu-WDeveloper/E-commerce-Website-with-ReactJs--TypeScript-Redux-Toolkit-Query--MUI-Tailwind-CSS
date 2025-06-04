import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../helpers/toasts/useToast";
import LoadingBackdrop from "../components/Backdrop";
import * as Sentry from "@sentry/react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}
interface AuthorData {
  name: {
    first: string;
    last: string;
  };
  picture: {
    medium: string;
  };
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          "https://randomuser.me/api/?results=5"
        );
        const data = response.data;
        // const meta = import.meta.env.VITE_BACK_URI;
        // console.log(meta);

        const authorsData = data.results.map((user: AuthorData) => {
          // user is a single object of type AuthorData, not an array

          return {
            name: `${user.name.first} ${user.name.last}`,
            isFollowing: false,
            image: user.picture.medium,
          };
        });
        setAuthors(authorsData);
      })();
    } catch (error) {
      // console.log("Error Fetching Products", error);
      if (import.meta.env.MODE !== "development") {
        Sentry.captureException(error);
      } else {
        console.error("Caught error:", error);
      }

      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleFollowClick = (index: number) => {
    // Step 1: Clone and update authors
    const updatedAuthors = [...authors];
    const targetAuthor = updatedAuthors[index];

    // Toggle follow state
    updatedAuthors[index] = {
      ...targetAuthor,
      isFollowing: !targetAuthor.isFollowing,
    };

    // Step 2: Update state
    setAuthors(updatedAuthors);

    // Step 3: Toast outside of state logic
    toast(
      !targetAuthor.isFollowing
        ? `You followed ${targetAuthor.name}`
        : `You unfollowed ${targetAuthor.name}`
    );
  };

  // const handleFollowClick = (index: number) => {
  //   setAuthors((prevAuther) =>
  //     prevAuther.map((author, i) =>
  //       i === index ? { ...author, isFollowing: !author.isFollowing } : author
  //     )
  //   );
  // };
  // loading ? (
  //   <Typography>Loading...</Typography>
  // ) :
  if (loading)
    return (
      // <Backdrop open={true}>
      //   <CircularProgress color="inherit" />
      // </Backdrop>
      <LoadingBackdrop />
    );

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
              <span className="ml-4 overflow-hidden w-[100px] font-bold">
                {author.name}
              </span>
            </section>
            <Button
              variant="contained"
              onClick={() => handleFollowClick(index)}
              sx={{
                backgroundColor: author.isFollowing ? "red" : "black",
                color: "white",
                ":hover": {
                  backgroundColor: author.isFollowing ? "red" : "black",
                  color: "white",
                },
              }}
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
