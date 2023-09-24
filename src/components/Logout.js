import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeStatus,
  user_id,
  user_token,
  user_name,
} from "../redux/mediaSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      changeStatus({
        user: false,
      })
    );
    dispatch(
      user_id({
        userid: null,
      })
    );
    dispatch(
      user_name({
        username: null,
      })
    );
    dispatch(
      user_token({
        userToken: null,
      })
    );

    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
