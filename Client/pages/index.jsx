import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "@/utilities/images.js";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/slices/auth";
import { toast } from "react-toastify";
import { emailREgex } from "@/utilities/Regex.js";
import Spinner from "@/Components/Common/Spinner";
import { useAuthSelector } from "@/redux/selector/auth";
import { useRouter } from "next/router";
import withOutAuth from "@/authentication/withOutAuth";
import Link from "next/link";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authSelector = useAuthSelector();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = (event, email) => {
    event.preventDefault();
    const params = {
      email,
      password
    };
    if (!emailREgex.test(params.email)) {
      toast.error("Enter a valid Email!");
      return;
    }
    if (!password) {
      toast.error("Enter a valid Password!");
      return;
    }
    dispatch(
      userLogin({
        ...params,
        cb(res) {
          if (res.status == 200) {
            router.push("/dashboard");
          }
        },
      })
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 gx-0">
          <div className="authCommonBg">
            <div className="loginCard text-center pb-4">
              {/* <Image src={images.logo} className="logo" alt="logo" /> */}
              <h3>Social Blaze</h3>
              <h2 className="heading24">Login</h2>
              <p className="text14 mb-4">
                Welcome! Enter the below details to login
              </p>
              <form
                onSubmit={(event) => {
                  handleLogin(event, email.trim());
                }}
              >
                <div className="form-group mb-5">
                  <div className="position-relative">
                    <input
                      className="customInput"
                      type="email"
                      required
                      value={email}
                      placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <Image
                      className="msgIcon "
                      src={images.msgIcon}
                      alt="email icon"
                    />
                  </div>
                  <div className="position-relative mt-4">
                    <input
                      className="customInput"
                      type="password"
                      required
                      value={password}
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <Image
                      className="msgIcon"
                      src={images.msgIcon}
                      alt="email icon"
                    />
                  </div>
                </div>
                {props?.isClient && (
                  <button
                    className={`authBtn ${
                      authSelector.loading ? "inactiveBtn" : ""
                    }`}
                    disabled={authSelector?.loading}
                  >
                    {authSelector?.loading ? <Spinner /> : "Login"}
                  </button>
                )}
                <h6  className="mt-3">Don't have a Account? Try <Link href={"/sign-up"}>Sign Up</Link> </h6>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withOutAuth(Login);
