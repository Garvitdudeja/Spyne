import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  blockUser,
  deleteACustomer,
  getStaffList,
  unblockUser,
  updateStaffRequest,
} from "@/redux/slices/web";
import ReactPaginate from "react-paginate";
import CustomModal from "@/Components/Common/CustomModal";
import SendNotification from "@/Components/Customers/SendNotification";
import swal from "sweetalert";
import { nullString } from "@/function/commonFunctions";
import { useRouter } from "next/router";

const index = () => {
  const [staffListData, setStaffListData] = useState({});
  const [key, setKey] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const [filter, setFilter] = useState({ page: 1, limit: 10, status: 1 });
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const blockUserAction = (data) => {
    const params = {
      blocked_user_id: data?.id,
    };
    swal({
      title: "Block Account",
      text: "Are you sure? You want to Block this account",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          blockUser({
            ...params,
            cb(res) {
              swal(
                "Account Blocked",
                `Hey! You successfully blocked ${
                  nullString(data?.user_profiles?.first_name) +
                  " " +
                  nullString(data?.user_profiles?.last_name)
                } user account.`
              ).then(getStaffListAction(filter));
            },
          })
        );
      }
    });
  };
  const updateStaffRequestAction = (id, status) => {
    const params = {
      id: id,
      status,
    };
    dispatch(
      updateStaffRequest({
        ...params,
        cb(res) {
          getStaffListAction({ page: 1, limit: 10, status: 1 });
        },
      })
    );
  };
  const unblockUserAction = (data) => {
    const params = {
      blocked_user_id: data?.id,
    };
    swal({
      title: "Unblock Account",
      text: "Are you sure? You want to unblock this account",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          unblockUser({
            ...params,
            cb(res) {
              swal(
                "Account Unblocked",
                `Hey! You successfully unblocked ${
                  nullString(data?.user_profiles?.first_name) +
                  " " +
                  nullString(data?.user_profiles?.last_name)
                } user account.`
              ).then(getStaffListAction(filter));
            },
          })
        );
      }
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
  const getStaffListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getStaffList({
        ...params,
        cb(res) {
          setStaffListData(res);
        },
      })
    );
  };
  useEffect(() => {
    getStaffListAction(filter);
  }, [filter]);
  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
  const handleCustomerDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Account",
      text: "Are you sure? You want to delete this account",
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
              ).then(getStaffListAction(filter));
            },
          })
        );
      }
    });
  };
  return (
    <>
      <div lang="row">
        <div className="employeesHeader">
          <div className="employeesBtn">
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 1 }));
              }}
              className={`${
                filter?.status == "1" ? "active" : ""
              }  employeeAllBtn`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 2 }));
              }}
              className={`${
                filter?.status == "2" ? "active" : ""
              }  employeeAllBtn`}
            >
              Requests
            </button>
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 3 }));
              }}
              className={`${
                filter?.status == "3" ? "active" : ""
              }  employeeAllBtn`}
            >
              Approved
            </button>
          </div>
          <form>
            <div className="customerSearch">
              <Image
                src={images.searchIcon}
                alt="icon"
                className="customerSearchIcon"
              />
              <input
                type="search"
                placeholder="Search here.."
                className="customerSearchInput"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }));
                }}
                value={filter?.search}
              />
              <Image
                src={images.crossIcon}
                alt="icon"
                onClick={() => setFilter((item) => ({ ...item, search: "" }))}
                className="customerCrossIcon"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <h3 className="headingGreen20 mb-0">All Staff </h3>
          <p className="text14 mb-0">{staffListData?.totalRecords} Staff</p>
        </div>
      </div>

      <div className="employTable">
        <div className="row">
          <div className="col-md-12">
            <table className="commonTable">
              <thead>
                <tr>
                  <th className="tableHeading">Name</th>
                  <th className="tableHeading">Availability</th>
                  <th className="tableHeading">Role</th>
                  <th className="tableHeading">Send Notification</th>
                  {/* <th className="tableHeading">Give Permissions</th> */}
                  <th className="tableHeading">Action</th>
                  <th className="tableHeading text-center">View Details</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(staffListData?.data) && staffListData?.data?.length>0 ?
                  staffListData?.data?.map((item) => (
                    <tr key={item?.id}>
                      <td className="tableHeading">
                        <div className="customerNameImg">
                          <Image
                            src={
                              item?.user_profiles?.profile_photo ??
                              images.customerImg
                            }
                            width={50}
                            height={50}
                            className="customerImg"
                            alt="customerImg"
                          />
                          <p className="heading16 mb-0">
                            {" "}
                            {(item?.user_profiles?.first_name ?? "") +
                              " " +
                              (item?.user_profiles?.last_name ?? "")}
                            y
                          </p>
                        </div>
                      </td>
                      <td className="tableHeading">Shift Assigned</td>
                      <td className="tableHeading">
                        {Array?.isArray(item?.user_skills) &&
                          item?.user_skills?.map((skill) => (
                            <button
                              key={skill?.id}
                              className="requestForBtn employRoleBtn"
                            >
                              {skill?.skill}
                            </button>
                          ))}
                      </td>
                      <td className="tableHeading">
                        <button
                          className="assignToSelectBtn employSendBtn"
                          onClick={() => {
                            setModalDetail({
                              show: true,
                              title: "Send Notifcation",
                              flag: "notification",
                              id: item?.id,
                            });
                            setKey(Math.random());
                          }}
                        >
                          Send
                        </button>
                      </td>
                      {/* <td className="tableHeading">
                        <Image
                          src={images.permissionImg}
                          className="permissionImg"
                          alt="permissionImg"
                        />
                        <span className="permissionText">3 Permissions</span>
                      </td> */}
                      <td className="tableHeading">
                        {item?.is_admin_approved ? (
                          <>
                            <Image
                              onClick={() => {
                                handleCustomerDelete(item);
                              }}
                              src={images.deleteIcon}
                              className="me-2 cursor"
                              alt="deleteIcon"
                            />
                            <Image
                              onClick={() => {
                                router.push("/editProfile?id=" + item?.id);
                              }}
                              src={images.penIcon}
                              className="ms-2 cursor"
                              alt="penIcon"
                            />
                            {item?.is_block ? (
                              <i
                                className="fa-solid fa-unlock unlockIcon"
                                onClick={() => {
                                  unblockUserAction(item);
                                }}
                              ></i>
                            ) : (
                              <Image
                                onClick={() => {
                                  blockUserAction(item);
                                }}
                                src={images.blockImg}
                                className="ms-3 cursor blockImg"
                                alt="blockIcon"
                              />
                            )}
                          </>
                        ) : (
                          <div className="col-md-12">
                            <div className="acceptRejectBtn">
                              <button
                                type="button"
                                className="assignToRejectBtn employSendBtn w-auto"
                                onClick={() => {
                                  updateStaffRequestAction(item?.id, 0);
                                }}
                              >
                                Reject
                              </button>
                              <button
                                className="assignToSelectBtn employSendBtn w-auto ms-3 px-3"
                                onClick={() => {
                                  updateStaffRequestAction(item?.id, 1);
                                }}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td
                        className="tableHeading text-center"
                        onClick={() => router.push("/staff/" + item?.id)}
                      >
                        <Image
                          src={images.rightArrow}
                          className="cursor"
                          alt="rightArrowImg"
                        />
                      </td>
                    </tr>
                  )):
                  <tr>
                  <td colSpan="5" className="text-center">
                    No Staff found.
                  </td>
                </tr>}
              </tbody>
            </table>
            {staffListData?.total_pages > 1 && (
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={staffListData?.total_pages}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
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

export default index;
