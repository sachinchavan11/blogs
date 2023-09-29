import styles from "./index.module.css";
import React, { useState, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/postReducer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import { fetchuserPost } from "../../redux/postReducer";

export function BasicSelect({ names, setActiveID }) {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setAge(event.target.value);
    const activeId = names.find((item) => item.name == selectedId);
    setActiveID(activeId.id);
  };

  return (
    <Box sx={{ minWidth: 200, maxHeight: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select user</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="filter"
          onChange={handleChange}
        >
          {names.map((item) => {
            return (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

const Header = (props) => {
  const [modalState, setModalState] = useState(false);
  const router = useRouter();

  const handleAddClick = (event) => {
    event.preventDefault();
    setModalState(true);
  };
  const handlesetState = (value) => {
    setModalState(value);
  };
  return (
    <>
      {modalState ? (
        <MyModal isOpen={modalState} setState={handlesetState} />
      ) : null}
      <div className={styles.main_container}>
        <div className={styles.title_container}>BLOGS AND POSTS</div>
        <div className={styles.text_add_cont}>
          <div className={styles.input_container}>
            <BasicSelect names={props.users} setActiveID={props.activeId} />
          </div>
          <a
            href="/thememodal"
            className={styles.button_container}
            onClick={handleAddClick}
          >
            +ADD
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;

const MyModal = ({ isOpen, setState }) => {
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [idval, setIdval] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.postReducer);

  const closeModal = () => {
    setState(false);
  };
  const handleChange = (e) => {
    setIdval(e.target.value);
    dispatch(fetchuserPost(e.target.value));
  };
  const handleSubmit = () => {
    const value = { userId: idval, id: id, title: title, body: body };
    dispatch(addPost(value));
    setState(false);
  };

  return (
    <>
      <Transition show={true} as={Fragment}>
        <Dialog
          as="div"
          className={styles.theme_main_container}
          onClose={closeModal}
        >
          <div className="flex  items-center justify-center min-h-screen p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-full max-w-md mx-auto overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  ENTER THE DETAILS TO ADD THE POST
                </Dialog.Title>

                <div className="mt-4  flex">
                  <div className={styles.input_cont_drop}>
                    <label>userId</label>
                    <Box sx={{ minWidth: 100, maxHeight: 10 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          userid
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={idval}
                          label="filter"
                          onChange={handleChange}
                        >
                          {userData.users.map((item) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.id}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className={styles.input_cont}>
                    <label className={styles.label}>id </label>
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Input 2"
                      value={userData.users.length + 1}
                    />
                  </div>
                  <div className={styles.input_cont}>
                    <label className={styles.label}>title </label>
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Input 3"
                      value={title}
                      required={true}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className={styles.input_cont}>
                    <label className={styles.label}>body</label>
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Input 4"
                      value={body}
                      required={true}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    Submit and Post
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
