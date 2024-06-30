import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { ImageUpload, getUserByID, updateUser } from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import Spinner from "@/Components/Common/Spinner";
import { useWebSelector } from "@/redux/selector/web";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import { useAuthSelector } from "@/redux/selector/auth";
const editProfile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const webData = useWebSelector();
  const id = router.query.id;
  const authSelector = useAuthSelector()
  const getUserAction = (id) => {
    dispatch(
      getUserByID({
        id,
        cb(res) {
          const temp = res;
          setData({
            userName: temp?.userName,
            phoneNumber: temp?.phoneNumber,
            email: temp?.email,
            oldEmail: temp?.email,
            image: temp?.image,
            _id: temp?._id,
          });
        },
      })
    );
  };
  useEffect(() => {
    if (authSelector?.userInfo?.data?.data?._id) getUserAction(authSelector?.userInfo?.data?.data?._id);
  }, [authSelector?.userInfo?.data?.data?._id]);
  const handleEditProfile = (event, data) => {
    event.preventDefault();
    if (!data?.profile_photo) {
      delete data.profile_photo;
    }
    if(data?.email == data?.oldEmail){
      delete data.email;
    }
    dispatch(
      updateUser({
        ...data,
        cb(res) {
            toast.success("User Updated Sucessfully!");
            router.push("/user/"+data?._id);
        }
      })
    );
  };

  return (
    <>
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div
            className="backArrowBtn"
            onClick={() => router.back()}
            alt="leftArrowImg"
          >
            <Image src={images.leftArrowLong} />
          </div>
          <div className="hospitalDetailOuter">
            <div className="hospitalDetailText">
              <h4 className="heading16">Edit Profile</h4>
              <p className="text14">Edit your profile details</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="editCustomerProfile">
          <div className="position-relative">
            {props?.isClient && (
              <Image
                src={data?.image ?? images.customerImg}
                className="customerProfileImg"
                alt="customerImg"
                width={100}
                height={100}
              />
            )}

            <div className="pencilImg">
            <CldUploadWidget
              uploadPreset="ml_default"
              onSuccess={(results) => {
                setData((prev) => ({ ...prev, image: results.info.secure_url }));
              }}
            >
              {({ open }) => (
                <button className="btn btn-primary" type="button" onClick={open}>
                                  <Image
                  src={images.pencilImg}
                  className="pencil "
                  alt="pencilImg"
                />
                </button>
              )}
            </CldUploadWidget>

              <label className="customerInputLable cursor" for="file-input">

              </label>
            </div>
          </div>

          <div className="editProflePara">
            <p className="heading14 mb-0">Hi</p>
            <p className="heading14 mb-0">Welcome</p>
            <p className="heading12 mb-0">Change your profile image</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          handleEditProfile(event, data);
        }}
      >
        <div className="editProfileForm">
          <div className="row my-4">
            <div className="col-md-12">
              <div className="shiftReqDescription">
                <p className="text12 mb-0">Name</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.userIconImg}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    className="filterInput w-100"
                    placeholder="John Smith"
                    value={data?.userName}
                    required
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        userName: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-2">
              <div className="shiftReqDescription">
                <p className="text12 mb-0">Email Address</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.emailImg}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="email"
                    required
                    className="filterInput w-100"
                    placeholder="Johnsmith@gmail.com"
                    value={data?.email}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-2">
              <div className="shiftReqDescription">
                <p className="text12 mb-0">Phone Number</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.permissionImg}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="number"
                    required
                    className="filterInput w-100"
                    placeholder="Johnsmith@gmail.com"
                    value={data?.phoneNumber}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        phoneNumber: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="editSkilsBtnInner">
              <div className="col-md-12 mt-4">
                <button
                  className={`profileBtn ${
                    webData.loading ? "inactiveBtn" : ""
                  }`}
                  type="submit"
                >
                  {webData?.loading && <Spinner className="pr-2" />}
                  Save Changes
                </button>
                {data?.user_role == 4 && (
                  <button
                    className={`profileBtn inactiveBtn ms-3`}
                    type="button"
                    onClick={() => {
                      router.push("/staff/skills/" + data?.id);
                    }}
                  >
                    Edit Skills
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default editProfile;
