import React, { useEffect } from "react";
import Router from "./routes";
import axios from "./api";
import { useAppDispatch } from "./redux";
import { setUser, logout, setUserLoading } from "./redux/slices/authSlice";

import Swal from "sweetalert2";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const uid = localStorage.getItem("uid");
      if (uid) {
        const res = await axios(`/users/${uid}`);
        if (res.data) {
          dispatch(setUser(res.data));
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Session has expired. Please log in again.",
      });
      localStorage.removeItem("uid");
      localStorage.removeItem("oid");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      dispatch(logout());
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  return (
    <>
      <Router />
    </>
  );
};

export default App;
