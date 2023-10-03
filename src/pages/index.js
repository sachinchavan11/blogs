import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import PostCards, { MyModal } from "../components/postCard/postcard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetails,
  fetchUserDetails,
  fetchuserPost,
} from "../redux/postReducer";
import { AddModal } from "../components/header/header";

export default function Home() {
  const [active, setActiveID] = useState("");
  const dispatch = useDispatch();
  const postdata = useSelector((state) => state.postReducer);
  const modalState = useSelector((state) => state.postReducer.Modalopen);
  const addModalstate = useSelector((state) => state.postReducer.AddModalopen);
  const activeuser = useSelector((state) => state.postReducer.activeSelected);
  const editActive = useSelector((state) => state.postReducer.editState);
 

  const fetchUserPosts = async () => {
    await dispatch(fetchuserPost(activeuser));
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
    if (activeuser !== "") {
      fetchUserPosts();
    }
  }, [activeuser]);

  return (
    <div>
      <AddModal isOpen={addModalstate} />
      <MyModal isOpen={modalState} editActive={editActive} />
      <Header users={postdata.users} />
      <PostCards postdata={postdata} />
    </div>
  );
}
