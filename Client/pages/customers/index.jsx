import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  blockUser,
  deleteACustomer,
  getCustomerList,
  unblockUser,
} from "@/redux/slices/web";
import { hanldeWholeNumbers, nullString } from "@/function/commonFunctions";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import CustomModal from "@/Components/Common/CustomModal";
import SendNotification from "@/Components/Customers/SendNotification";
import { useRouter } from "next/router";
const index = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [customerListData, setCustomerListData] = useState();
  const [filter, setFilter] = useState({ page: 1, limit: 10 });
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const [key, setKey] = useState(Math.random());
  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };
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
              ).then(getCustomerListAction(filter));
            },
          })
        );
      }
    });
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
              ).then(getCustomerListAction(filter));
            },
          })
        );
      }
    });
  };

  const getCustomerListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getCustomerList({
        ...params,
        cb(res) {
          setCustomerListData(res);
        },
      })
    );
  };
  useEffect(() => {
    getCustomerListAction(filter);
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
              ).then(getCustomerListAction(filter));
            },
          })
        );
      }
    });
  };
  return (
    <>
      <div className="customerOuter">
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="shiftRequestFilter">
              <div>
                <h3 className="headingGreen20 mb-0">All Customers </h3>
                <p className="text14 mb-0">
                  {hanldeWholeNumbers(customerListData?.total)} Customers
                </p>
              </div>
              <div className="shiftRequestRight">
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
                      onClick={() =>
                        setFilter((item) => ({ ...item, search: "" }))
                      }
                      className="customerCrossIcon"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row mt-3">
        <div className="col-md-12">
          <div className="allCustomerHeading"><p className="heading14">All Customers</p></div>
        </div>
      </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="customerTable">
              <table className="commonTable">
                <thead>
                  <tr>
                    <th className="tableHeading">Name</th>
                    <th className="tableHeading">Total Shift</th>
                    <th className="tableHeading">Send Notification</th>
                    <th className="tableHeading">Action</th>
                    <th className="tableHeading text-center">View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.isClient && customerListData?.data?.length > 0 ? (
                    props?.isClient &&
                    customerListData?.data?.map((item) => {
                      return (
                        <tr>
                          <td className="tableHeading">
                            <div className="customerNameImg">
                              <Image
                                src={item?.user_profiles?.profile_photo}
                                width={50}
                                height={50}
                                className="customerImg"
                                alt="profileImg"
                              />
                              <p className="heading14 mb-0">
                                {(item?.user_profiles?.first_name ?? "") +
                                  " " +
                                  (item?.user_profiles?.last_name ?? "")}
                              </p>
                            </div>
                          </td>
                          <td className="tableHeading">
                            {Array.isArray(item?.customer_current_jobs) &&
                              item?.customer_current_jobs?.length}{" "}
                            Shift booked this month
                          </td>
                          <td className="tableHeading">
                            <button
                              className="assignToSelectBtn"
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
                          <td className="tableHeading">
                            <Image
                              onClick={() => {
                                handleCustomerDelete(item);
                              }}
                              src={images.deleteIcon}
                              className="me-2 cursor"
                              alt="deleteImg"
                            />
                            <Image
                              src={images.penIcon}
                              className="ms-2 cursor"
                              alt="penImg"
                              onClick={() => {
                                router.push("/editProfile?id=" + item?.id);
                              }}
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
                          </td>
                          <td
                            className="tableHeading text-center"
                            onClick={() => {
                              router.push(`/customers/${item?.id}`);
                            }}
                          >
                            <Image
                              src={images.rightArrow}
                              className="cursor"
                              alt="rightArrowImg"
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan="5" className="text-center">
                          No customers found.
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {customerListData?.total_pages > 1 && (
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={customerListData?.total_pages}
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
