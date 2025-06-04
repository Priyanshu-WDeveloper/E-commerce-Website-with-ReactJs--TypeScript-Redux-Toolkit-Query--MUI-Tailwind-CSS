import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLazyGetUsersQuery } from "../services/Users";
import { User } from "../types/userTypes";
import * as Sentry from "@sentry/react";

// Define the author type that we'll use for our state
interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopUsers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [getUsers] = useLazyGetUsersQuery();
  const getUsersData = async () => {
    try {
      const response = await getUsers({
        limit: 5,
        skip: 0, // skip the first 0 users
      }).unwrap();
      // console.log(response.users);
      const authorsData = response.users.map((user: User) => {
        // Transform the User object into our Author format
        // console.log(user);

        return {
          name: user.username,
          isFollowing: false,
          image: user.image,
        };
      });
      setAuthors(authorsData);
      // console.log("authors", authors);
    } catch (error) {
      // console.log(error);
      if (import.meta.env.MODE !== "development") {
        Sentry.captureException(error);
      } else {
        console.error("Caught error:", error);
      }
    }
  };
  // const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     try {
  //       (async () => {
  //         const response = await axios.get(
  //           "https://randomuser.me/api/?results=5"
  //         );
  //         const data = response.data;
  //         // const meta = import.meta.env.VITE_BACK_URI;
  //         // console.log(meta);

  //         const authorsData = data.results.map((user: AuthorData) => {
  //           // user is a single object of type AuthorData, not an array

  //           return {
  //             name: `${user.name.first} ${user.name.last}`,
  //             isFollowing: false,
  //             image: user.picture.medium,
  //           };
  //         });
  //         setAuthors(authorsData);
  //       })();
  //     } catch (error) {
  //       console.log("Error Fetching Products", error);
  //       // setLoading(false);
  //     }
  //     // finally {
  //     //   setLoading(false);
  //     // }
  //   }, []);
  const handleFollowClick = (index: number) => {
    setAuthors((prevAuther: Author[]) =>
      prevAuther.map((author: Author, i: number) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };
  // loading ? (
  //   <Typography>Loading...</Typography>
  // ) :
  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <Box sx={{ boxShadow: 2 }} className=" bg-white p-5 w-[21rem] rounded ">
      <Typography sx={{ fontWeight: "bold", mb: "10px" }} variant="h5">
        Top Sellers
      </Typography>
      <ul>
        {authors.map((author: Author, index: number) => (
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

export default TopUsers;
