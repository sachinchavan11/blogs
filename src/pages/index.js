import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import PostCards from "../components/postCard/postcard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetails,
  fetchUserDetails,
  fetchuserPost,
} from "../redux/postReducer";

export default function Home() {
  const [active, setActiveID] = useState("");
  const dispatch = useDispatch();
  const postdata = useSelector((state) => state.postReducer);

  const handleActiveId = (id) => {
    setActiveID(id);
  };

  const fetchUserPosts = async () => {
    await dispatch(fetchuserPost(active));
  };

  const fetchPosts = async () => {
    await dispatch(fetchDetails());
  };

  const fetchusers = async () => {
    await dispatch(fetchUserDetails());
  };

  useEffect(() => {
    fetchusers();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (active !== "") {
      fetchUserPosts();
    }
  }, [active]);

  return (
    <div>
      <Header users={postdata.users} activeId={handleActiveId} />
      <PostCards postdata={postdata} />
    </div>
  );
}
