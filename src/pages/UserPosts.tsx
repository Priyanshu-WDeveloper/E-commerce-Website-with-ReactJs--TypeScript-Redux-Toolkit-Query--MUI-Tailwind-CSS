import {
  Box,
  // , duration
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useEffect, useState } from "react";
import { useLazyGetPostsQuery } from "../services/UserPosts";
import {
  //  scale,
  motion,
} from "framer-motion";
import LoadingBackdrop from "../components/Backdrop";
import * as Sentry from "@sentry/react";
import { Post } from "../types/userPosts";
// Generic shuffle function
const shuffleArray = <T,>(arr: T[]): T[] => {
  // Fisher-Yates shuffle, pure and fair
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const UserPosts = () => {
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [getPosts, { isLoading }] = useLazyGetPostsQuery();

  // const iconSize = 18;

  // Define an interface for the reaction object structure
  interface Reaction {
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
  }

  // Define the reactions state with proper indexing
  const [reactions, setReactions] = useState<Record<number, Reaction>>({}); // { postId: { likes, dislikes, liked, disliked } }
  // const animateScale = {
  //   scale: [1, 1.3, 1], // pop effect: grow then back
  // };
  // const transition = {
  //   duration: 0.3,
  //   ease: "easeInOut",
  // };

  const toggleReaction = (id: number, type: "like" | "dislike") => {
    setReactions((prev) => {
      const r = prev[id];
      const updated = { ...r };
      if (type === "like") {
        updated.likes += r.liked ? -1 : 1;
        updated.liked = !r.liked;
        if (r.disliked) {
          updated.disliked = false;
          updated.dislikes -= 1;
        }
      } else {
        updated.dislikes += r.disliked ? -1 : 1;
        updated.disliked = !r.disliked;
        if (r.liked) {
          updated.liked = false;
          updated.likes -= 1;
        }
      }
      return { ...prev, [id]: updated };
    });
  };

  const getPostsData = async () => {
    try {
      const response = await getPosts({ limit: 5, skip: 0 }).unwrap();
      // console.log("response", response);
      // const posts = response?.posts || [];
      if (response?.posts?.length) {
        const shuffled = shuffleArray(response?.posts);

        setRandomPosts(shuffled);
        const initial: Record<number, Reaction> = {};
        shuffled.forEach(({ id, reactions }) => {
          initial[id] = { ...reactions, liked: false, disliked: false };
        });
        setReactions(initial);
      }
    } catch (error) {
      // console.log(error);
      if (import.meta.env.MODE !== "development") {
        Sentry.captureException(error);
      } else {
        console.error("Caught error:", error);
      }
    }
  };
  useEffect(() => {
    getPostsData();
  }, []);
  if (isLoading) {
    <LoadingBackdrop />;
  }
  return (
    <Box
      sx={{ boxShadow: 2, paddingBottom: "10px" }}
      className=" bg-white p-7 w-[21rem] mr-2 mt-4 rounded "
    >
      <Typography variant="h4" className=" text-xl font-bold mb-5  ">
        User Posts
      </Typography>
      <ul>
        {randomPosts.map((blog) => {
          // const r = reactions[blog.id] || blog.reactions;
          return (
            // <li key={blog.id} className="mb-4">
            //   <Box className=" flex justify-between items-center ">
            //     <span className=" font-bold mb-2 ">{blog.title}</span>
            //   </Box>
            //   <span className="text-gray-600">Publish by {blog.author}</span>
            //   <Box className="flex items-center mt-2">
            //     <ThumbUpIcon />
            //     <span className="text-gray-500 mr-5 ml-1">
            //       {blog.reactions.likes}
            //     </span>
            //     {/* <ChatBubbleIcon /> */}
            //     <ThumbDownIcon />
            //     <span className="text-gray-500 mr-5 ml-2">
            //       {blog.reactions.dislikes}
            //     </span>
            //   </Box>
            // </li>
            <li key={blog.id} className="mb-4">
              <Box className="flex justify-between items-center">
                <span className="font-bold mb-2">{blog.title}</span>
              </Box>

              {/* <span className="text-gray-600">Publish by {blog.author}</span> */}

              {/* New line for Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-1 mb-1">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Views and reactions */}
              <Box className="flex items-center mt-2">
                {(["like", "dislike"] as ("like" | "dislike")[]).map((type) => {
                  const Icon = type === "like" ? ThumbUpIcon : ThumbDownIcon;
                  return (
                    <motion.div
                      key={type}
                      whileTap={{ scale: 1.3 }}
                      className="flex items-center cursor-pointer mr-4"
                      onClick={() => toggleReaction(blog.id, type)}
                    >
                      <Icon
                        fontSize="small"
                        style={{
                          color:
                            type === "like"
                              ? reactions[blog.id]?.liked
                                ? "#3b82f6"
                                : "#6b7280"
                              : reactions[blog.id]?.disliked
                              ? "#ef4444"
                              : "#6b7280",
                        }}
                      />
                      <span className="text-gray-500 ml-1">
                        {type === "like"
                          ? reactions[blog.id]?.likes ?? blog.reactions.likes
                          : reactions[blog.id]?.dislikes ??
                            blog.reactions.dislikes}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Views icon + count */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-gray-500 ml-1">{blog.views}</span>
              </Box>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default UserPosts;
