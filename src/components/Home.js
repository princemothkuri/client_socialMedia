import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import PostCards from "./PostCards";

const Home = () => {
  const jwt = useSelector((state) => state.media.userToken);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [pics, setPics] = useState();

  const getAllPosts = async () => {
    try {
      const res = await fetch(
        "https://prince-server-socialmedia.onrender.com/api/posts",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            jwtoken: jwt,
          }),
        }
      );
      const response = await res.json();
      setPics(response.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="container">
      <div className="add row p-2 ">
        <h1 className="col-4">Posts</h1>
        <div className="col-8 d-flex justify-content-end align-items-center">
          <button className="btnInfo" onClick={() => navigate("/addpost")}>
            Add photos
          </button>
        </div>
      </div>
      <div className="containerHome">
        {pics.map(function (item, index) {
          // console.log("log from home -> " + item.username);
          return (
            <>
              <PostCards key={item._id} item={item} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
