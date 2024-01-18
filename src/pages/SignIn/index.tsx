import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useAppDispatch } from "../../redux";
import { setUserLoading, setUser } from "../../redux/slices/authSlice";
import { useHistory } from "react-router-dom";

import "./SignIn.scss";
import Swal from "sweetalert2";
import { Row, Col } from "antd";
import SignInComponent from "../../components/SignIn";
import Background from "../../assets/jpg/background.jpg";
/* import LoadingComponent from "../../components/Loading"; */

export type SignInFieldType = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [background, setBackground] = useState<string>("");

  useEffect(() => {
    setBackground(Background);
  }, []);

  const onSignIn = async ({ email, password }: SignInFieldType) => {
    dispatch(setUserLoading(true));
    try {
      const res = await axios.post(
        "/users/signin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res.data.user.role_id !== 2) {
        throw new Error("Unauthorize");
      }
      if (res.data.user && res.data.token) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("uid", res.data.user.id);
        localStorage.setItem("oid", res.data.token.id);
        localStorage.setItem("access_token", res.data.token.access_token);
        localStorage.setItem("refresh_token", res.data.token.refresh_token);
        history.replace("/?page=1&order_by=price&sort=ASC");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorize") {
        Swal.fire({
          icon: "error",
          text: "Unauthorize",
        });
        return;
      }
      if (
        error.response?.data?.message === "password is invalid" ||
        error.response?.data?.message === "user not found"
      ) {
        Swal.fire({
          icon: "error",
          text: "The username or password is incorrect.",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "An error occurred. Please try again later.",
        });
      }
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  /*   if (!background) {
    return <LoadingComponent />;
  } */

  return (
    <Row
      align="middle"
      style={{ backgroundImage: `url(${background})` }}
      className="web-pages-sign-in-container"
    >
      <Col offset={12} span={12}>
        <SignInComponent onSignIn={onSignIn} />
      </Col>
    </Row>
  );
};

export default SignIn;
