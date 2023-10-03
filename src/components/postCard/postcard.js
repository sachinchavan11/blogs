import React from "react";
import styles from "./index.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails } from "../../redux/postReducer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  setViewModal,
  modalStateReset,
  EditModalState,
  putUserDetails,
} from "../../redux/postReducer";

const PostCards = (props) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteDetails(id));
  };
  return (
    <div className={styles.margin_cont}>
      {props.postdata.posts.length
        ? props.postdata.posts.map((item) => {
            return (
              <div key={item.id}>
                <Card item={item} handleDelete={handleDelete} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default PostCards;

const Card = ({ item, handleDelete }) => {
  const { title, id, body, userId } = item;
  const [isHovered, setIsHovered] = useState(false);
  const handleMoreVertClick = () => {
    setIsHovered(!isHovered);
  };
  const truncatedTitle = title.length > 20 ? `${title.slice(0, 10)}...` : title;
  const uppercaseTitle = truncatedTitle.toUpperCase();

  return (
    <div className={styles.main_container}>
      <div className={styles.card_container}>
        <div className={styles.location_cont}>
          <LocationOnIcon />
        </div>
        <p className={styles.title_cont}>{uppercaseTitle}</p>
      </div>
      <div className="text-red-500">Last saved date 22:55 27/09/2023</div>
      <div className={styles.dot_container} onClick={handleMoreVertClick}>
        <MoreVertIcon />
      </div>
      <div className={styles.hover_cont}>
        {isHovered && (
          <Hover handleDelete={handleDelete} id={id} userId={userId} />
        )}
      </div>
    </div>
  );
};

const Hover = ({ handleDelete, id, userId }) => {
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();
  const viewData = useSelector((state) => state.postReducer);
  const handleDeleteClick = () => {
    handleDelete(id);
  };

  const handleEditClick = () => {
    dispatch(EditModalState(id, userId));
  };

  const handleViewButton = () => {
    dispatch(setViewModal(id));
  };

  return (
    <div className={styles.hover_container}>
      <button className={styles.btn_container} onClick={handleEditClick}>
        Edit
      </button>
      <button className={styles.btn_container} onClick={handleDeleteClick}>
        delete
      </button>
      <button className={`${styles.btn_container}`} onClick={handleViewButton}>
        view
      </button>
    </div>
  );
};

export function MyModal({ isOpen, editActive }) {
  
  const dispatch = useDispatch();
  const viewData = useSelector((state) => state.postReducer.view);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id, userId } = useSelector((state) => state.postReducer.editVal);

  const closeModal = () => {
    dispatch(modalStateReset());
  };
  const handleDetails = () => {
    dispatch(putUserDetails(title, body, id, userId));
    dispatch(modalStateReset());
    setTitle("");
    setBody("");
  };
  console.log("edi",editActive)

  return (
    <>
      <Transition appear show={isOpen || false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {editActive ? "EDIT DETAILS" : "VIEW DETAILS"}
                  </Dialog.Title>
                  {editActive ? (
                    <>
                      <div className={styles.input_cont}>
                        <label className={styles.label}>Title </label>
                        <input
                          type="text"
                          className="border border-gray-300 p-2 w-full rounded-[8px]"
                          placeholder="Input 2"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className={styles.input_cont}>
                        <label className={styles.label}>Body </label>
                        <input
                          type="text"
                          className="border border-gray-300 p-2 w-full rounded-[8px]"
                          placeholder="Input 3"
                          value={body}
                          required={true}
                          onChange={(e) => setBody(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="mt-2">
                      <p className="text-[20px] font-bold text-gray-500">
                        {viewData?.title}
                      </p>
                      <p className="text-sm text-gray-500">{viewData?.body}</p>
                    </div>
                  )}

                  <div className="mt-4">
                    {editActive ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleDetails}
                      >
                        Update Details
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it thanks
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
