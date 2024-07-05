import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteACustomer, getUserByID } from "@/redux/slices/web";
import { nullString } from "@/function/commonFunctions";
import { toast } from "react-toastify";
import CustomModal from "@/Components/Common/CustomModal";
import SendNotification from "@/Components/Customers/SendNotification";
import swal from "sweetalert";
import moment from "moment";
import Post from "@/Components/Common/Post";
import { useAuthSelector } from "@/redux/selector/auth";
const CustomerView = (props) => {
  const router = useRouter();
  const authSelector = useAuthSelector()
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const UserID = router.query?.id;
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const getUserAction = (id) => {
    try {
      dispatch(
        getUserByID({
          id,
          cb(res) {
            setData(res);
          },
        })
      );
    } catch (e) {
      console.log(e, "eeeeeeeeeeeee");
    }
  };
  const handleDeletePost = (id) => {
    setData((prev) => {
      const newList = prev.posts.filter((item) => item._id != id);
      return { ...prev, posts: newList };
    });
  };
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };
  useEffect(() => {
    if (UserID && props?.isClient) {
      getUserAction(UserID);
    }
  }, [UserID]);
  const handleCustomerDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Account",
      text: "Are you sure? You want to delete this account",
      className: "swalCustom",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteACustomer({
            ...params,
            cb(res) {
              swal(
                "Account Deleted",
                `Hey! You successfully deleted ${
                  nullString(data?.user_profiles?.first_name) +
                  " " +
                  nullString(data?.user_profiles?.last_name)
                } user account.`
              ).then(() => {
                router.push("/customers");
                toast.success("Account Deleted SuccessFully");
              });
            },
          })
        );
      }
    });
  };
  return (
    <>
      <div className="customerViewOuter">
        <div className="commonHeader mb-3">
          <div className="hospitalDetail">
            <div
              className="backArrowBtn"
              onClick={() => {
                router.back();
              }}
            >
              <Image src={images.leftArrowLong} alt="leftArrowImg" />
            </div>
            <div className="hospitalDetailOuter">
              <div className="hospitalDetailText">
                <h4 className="heading16">User Detail</h4>
              </div>
            </div>
          </div>
          <div className="customerBtns">
            {props?.isClient && authSelector?.userInfo?.data?.data?._id == data?._id && (
              <>
                <button
                  className="editBtnRounded me-2"
                  onClick={() => router.push("/editProfile")}
                >
                  <Image
                    src={images.penIconGreen}
                    className="me-2"
                    alt="penIconImg"
                  />
                  <span>Edit Details</span>
                </button>
                <button
                  className="deleteBtnRounded"
                  onClick={() => {
                    handleCustomerDelete(data);
                  }}
                >
                  <Image
                    src={images.deleteIcon}
                    className="me-2"
                    alt="deleteImg"
                  />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="customerDetailOuter mb-3">
              <div className="customerDetailLeft">
                <div className="customerDetailIconOuter">
                  <Image
                    src={
                      data?.image ?? images.customerImg
                    }
                    width={50}
                    height={20}
                    alt="customerIcon"
                  />
                </div>
                <div className="customerDetailText">
                  <h4 className="heading16 mb-0">
                    {nullString(data?.user_profiles?.first_name) +
                      " " +
                      nullString(data?.user_profiles?.last_name)}
                  </h4>
                  <p className="text12 mb-0">{data?.userName}</p>
                  <p className="requestCommonDate mb-0">
                    {nullString(data?.email)}
                  </p>
                </div>
              </div>
              {/* <div className="customerDetailRight">
                <p className="text12 mb-1">Associated with sites</p>
                <Image
                  src={images.locationIcon}
                  className="customerLocationIcon"
                  alt="locationImg"
                />
                <span className="requestCommonDate">
                  Work at Mercy Hospital +3 others
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <h5>User Posts</h5>
      {data?.posts?.length > 0
        ? data?.posts?.map((item) => <Post 
        deletePost={(id) => {
          handleDeletePost(id);
        }}
        data={item} />)
        : "No Post Found"}

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={true}
        isRightSideModal={false}
        mediumWidth={false}
        className={modalDetail.flag ? "commonWidth customContent" : ""}
        ids={modalDetail.flag}
        child={
          <SendNotification
            id={modalDetail.id}
            close={() => handleOnCloseModal()}
          />
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default CustomerView;
