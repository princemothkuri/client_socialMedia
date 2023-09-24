import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostCards = ({ item }) => {
  const [loadingModal, setLoadingMoadal] = useState(false);
  const jwt = useSelector((state) => state.media.userToken);
  const status = useSelector((state) => state.media.user);
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes.length);
  const navigate = useNavigate();
  const [displayNone, setDisplayNone] = useState(false);
  const className = displayNone ? "d-none" : "";

  const handleLikeClick = async () => {
    if (!like) {
      setLikesCount(likesCount + 1);
      try {
        const res = await fetch(
          "https://prince-server-socialmedia.onrender.com/api/posts/like",
          {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              id: item._id,
              jwtoken: jwt,
            }),
          }
        );
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
    } else {
      setLikesCount(likesCount - 1);
      try {
        const res = await fetch(
          "https://prince-server-socialmedia.onrender.com/api/posts/unlike",
          {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              id: item._id,
              jwtoken: jwt,
            }),
          }
        );
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (item.likes.map((i) => i === status).length > 0) {
      setLike(true);
    }
  }, []);

  return (
    <>
      <div className={`card mb-3 ${className}`} key={item._id}>
        <img src={item.image} className="card-img-top" alt="image" />
        <div className="card-body">
          <div className="card-btn d-flex justify-content-between gap-3">
            <div className="mt-3">
              <div
                className="like d-flex gap-2 "
                onClick={() => {
                  setLike(!like);
                  handleLikeClick();
                }}
              >
                {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                {"   "}
                <p className="text-black-50">
                  {likesCount}
                  Likes
                </p>
              </div>
            </div>
            <div
              className="comment d-flex justify-content-center align-items-center"
              onClick={() => navigate(`/post?id=${item._id}`)}
            >
              <InsertCommentOutlinedIcon />
              <p className="p-1 mt-2">Comments</p>
            </div>
          </div>
          <p className="card-text">
            <small className="text-muted">Description</small>
            <br />
            {item.description}
          </p>
          <p>
            <small className="text-muted">Posted by:</small>
            <br />@{item.username}
          </p>

          {item.user === status ? (
            <button
              className="btn btn-outline-danger mt-1"
              onClick={async () => {
                setDisplayNone(true);
                try {
                  const res = await fetch(
                    "https://prince-server-socialmedia.onrender.com/api/posts/",
                    {
                      method: "DELETE",
                      headers: {
                        "content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: item._id,
                        jwtoken: jwt,
                      }),
                    }
                  );

                  const data = await res.json();
                } catch (error) {
                  setLoadingMoadal(false);

                  console.log(error);
                }
              }}
            >
              Delete post
            </button>
          ) : (
            ""
          )}
        </div>
        {/* --------------modal-Loading--------------- */}
        {loadingModal ? (
          <>
            <div className="modal-wrapper "></div>
            <div className="modal-container-loading">
              <div className="circleDots">
                <ReactLoading
                  type="spinningBubbles"
                  color="#0000FF"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* --------------modal-Loading END--------------- */}
      </div>
    </>
  );
};

export default PostCards;
