import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "@/utilities/images.js";
import { useDispatch } from "react-redux";
import { userLogin, userSignUp } from "@/redux/slices/auth";
import { toast } from "react-toastify";
import { emailREgex } from "@/utilities/Regex.js";
import Spinner from "@/Components/Common/Spinner";
import { useAuthSelector } from "@/redux/selector/auth";
import { useRouter } from "next/router";
import withOutAuth from "@/authentication/withOutAuth";
import { CldUploadWidget } from "next-cloudinary";

const SignUp = (props) => {
  const [data, setData] = useState({});
  const authSelector = useAuthSelector();
  const router = useRouter();
  const dispatch = useDispatch();
  const hanldeSignUp = (event) => {
    event.preventDefault();
    const params = {
      ...data
    };
    if (!emailREgex.test(params.email)) {
      toast.error("Enter a valid Email!");
      return;
    }
    if (!params.password) {
      toast.error("Enter a valid Password!");
      return;
    }
    if (!params.phoneNumber) {
      toast.error("Enter a valid phoneNumber!");
      return;
    }
    if (!params.userName) {
      toast.error("Enter a valid Name!");
      return;
    }
    dispatch(
      userSignUp({
        ...params,
        cb(res) {
          if (res.status == 200) {
            router.push("/");
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
              <h2 className="heading24">Sign Up</h2>
              <p className="text14 mb-4">
                Welcome! Enter the below details to Sign Up
              </p>
              <form
                onSubmit={(event) => {
                  hanldeSignUp(event);
                }}
              >
                <div className="form-group mb-5">
                  <div className="row mb-3 mt-3">
                    <div className="col-md-12">
                      <CldUploadWidget
                        uploadPreset="ml_default"
                        onSuccess={(results) => {
                          setData((prev) => ({
                            ...prev,
                            image:  results.info.secure_url,
                          }));
                          console.log("Public ID", results.info.secure_url);
                        }}
                      >
                        {({ open }) => (
                          <button className="" onClick={open}>
                            <Image
                              src={data?.image ?? images.doctorIcon}
                              height={100}
                              width={100}
                            />
                          </button>
                        )}
                      </CldUploadWidget>
                    </div>
                  </div>
                  <div className="position-relative">
                    <input
                      className="customInput"
                      type="email"
                      required
                      value={data?.email}
                      placeholder="Email Address"
                      onChange={(e) => {
                        setData((prev) => ({ ...prev, email: e.target.value }));
                      }}
                    />
                    <i class="fa-solid fa-envelope msgIcon "></i>
                  </div>
                  <div className="position-relative mt-4">
                    <input
                      className="customInput"
                      type="password"
                      required
                      value={data?.password}
                      placeholder="Password"
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <i className="fa-solid fa-lock msgIcon"></i>
                  </div>
                  <div className="position-relative mt-3">
                    <input
                      className="customInput"
                      type="text"
                      required
                      value={data?.userName}
                      placeholder="Name"
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          userName: e.target.value,
                        }));
                      }}
                    />
                    <i class="fa-solid fa-person msgIcon "></i>
                  </div>
                  <div className="position-relative mt-3">
                    <input
                      className="customInput"
                      type="Number"
                      required
                      value={data?.phoneNumber}
                      placeholder="Phone Number"
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }));
                      }}
                    />
                    <i class="fa-solid fa-phone msgIcon "></i>
                  </div>
                </div>

                {props?.isClient && (
                  <button
                    className={`authBtn ${
                      authSelector.loading ? "inactiveBtn" : ""
                    }`}
                    disabled={authSelector?.loading}
                  >
                    {authSelector?.loading ? <Spinner /> : "Sign Up"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withOutAuth(SignUp);
