import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "The Rise of React",
      author: "John Doe",
      like: 120,
      comment: 45,
    },
    {
      title: "Understanding TypeScript",
      author: "Jane Smith",
      like: 200,
      comment: 65,
    },
    {
      title: "JavaScript Tips & Tricks",
      author: "Alex Johnson",
      like: 150,
      comment: 30,
    },
    {
      title: "Web Development in 2025",
      author: "Emily Davis",
      like: 175,
      comment: 50,
    },
    // {
    //     title: "Intro to CSS Grid",
    //     author: "Michael Lee",
    //     like: 80,
    //     comment: 20,
    // },
  ];
  return (
    <Box
      sx={{ boxShadow: 2 }}
      className=" bg-white p-7 w-[21rem] mr-2 mt-4 mb-5    rounded "
    >
      <Typography variant="h4" className=" text-xl font-bold mb-5  ">
        Popular Blogs
      </Typography>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-4">
            <Box className=" flex justify-between items-center ">
              <span className=" font-bold mb-2 ">{blog.title}</span>
            </Box>
            <span className="text-gray-600">Publish by {blog.author}</span>
            <Box className="flex items-center mt-2">
              <ThumbUpIcon />
              <span className="text-gray-500 mr-5 ml-1">{blog.like}</span>
              <ChatBubbleIcon />
              <span className="text-gray-500 mr-5 ml-2">{blog.comment}</span>
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default PopularBlogs;
