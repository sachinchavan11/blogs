import React from "react";
import styles from "./index.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDetails } from "../../redux/postReducer";

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
                <Card
                  title={item.title}
                  id={item.id}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default PostCards;

const Card = ({ title, id, handleDelete }) => {
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
      <div>Last saved date 22:55 27/09/2023</div>
      <div className={styles.dot_container} onClick={handleMoreVertClick}>
        <MoreVertIcon />
      </div>
      <div className={styles.hover_cont}>
        {isHovered && <Hover handleDelete={handleDelete} id={id} />}
      </div>
    </div>
  );
};

const Hover = ({ handleDelete, id }) => {
  const handleDeleteClick = () => {
    handleDelete(id);
  };

  return (
    <div className={styles.hover_container}>
      <button className={styles.btn_container}>Edit</button>
      <button className={styles.btn_container} onClick={handleDeleteClick}>
        delete{" "}
      </button>
      <button className={styles.btn_container}>view</button>
    </div>
  );
};
