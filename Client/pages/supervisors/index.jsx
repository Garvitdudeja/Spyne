import React, { useState, useEffect } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteACustomer, getSupervisorList } from "@/redux/slices/web";
import { hanldeWholeNumbers } from "@/function/commonFunctions";
import CustomModal from "@/Components/Common/CustomModal";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import SendNotification from "@/Components/Customers/SendNotification";
import AddSupervisorModal from "@/Components/Supervisor/AddSupervisorModal";
import { useRouter } from "next/router";

const SupervisorListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [supervisorListData, setSupervisorListData] = useState();
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
  const getSupervisorListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getSupervisorList({
        ...params,
        cb(res) {
          setSupervisorListData(res);
        },
      })
    );
  };
  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
  const handleSupervisorDelete = (data) => {
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
              ).then(getSupervisorListAction(filter));
            },
          })
        );
      }
    });
  };

  useEffect(() => {
    getSupervisorListAction(filter);
  }, [filter]);

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="shiftRequestFilter">
            <div>
              <h3 className="headingGreen20 mb-0">All Customer </h3>
              <p className="text14 mb-0">
                {hanldeWholeNumbers(supervisorListData?.totalUsers)}{" "}
                Users
              </p>
            </div>
            <div className="supervisorRight">
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
                        page: 1,
                        limit: 10,
                      }));
                    }}
                    value={filter?.search}
                  />
                  <Image
                    src={images.crossIcon}
                    alt="icon"
                    onClick={() =>
                      setFilter((prev) => ({
                        ...prev,
                        search: "",
                        page: 1,
                        limit: 10,
                      }))
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
          <div className="allCustomerHeading"><p className="heading14">All Supervisors</p></div>
        </div>
      </div> */}
      <div className="supervisorTable">
        <div className="row">
          <div className="col-md-12">
            <table className="commonTable">
              <thead>
                <tr>
                  <th className="tableHeading">Name</th>
                  <th className="tableHeading">Send Notification</th>
                  <th className="tableHeading">Posts</th>
                  <th className="tableHeading">View Profile</th>

                  {/* <th className="tableHeading text-center">View Details</th> */}
                </tr>
              </thead>
              <tbody>
                {supervisorListData?.data?.length > 0 ? (
                  supervisorListData?.data?.map((item) => {
                    return (
                      <tr>
                        <td className="tableHeading">
                          <div className="customerNameImg">
                            <Image
                              src={
                                item?.image ??
                                images.customerImg
                              }
                              width={50}
                              height={50}
                              className="customerImg"
                              alt="supervisorImg"
                            />
                            <p>{item?.userName}</p>
                            <div className="customerNameEmail">
                              <p className="heading16 mb-0">
                                {(item?.user_profiles?.first_name ?? "") +
                                  " " +
                                  (item?.user_profiles?.last_name ?? "")}
                              </p>
                              {/* <p className="text12 mb-0">Trop@gmail.com</p> */}
                            </div>
                          </div>
                        </td>
                        {/* <td className="tableHeading">
                  <button className="requestForBtn employRoleBtn" >
                    Nurse - Pre-Op, Circulating
                  </button>
                </td> */}
                        <td className="tableHeading">
                          <p>{item?.email}</p>
                        </td>
                        <td className="tableHeading">
                          {item?.posts?.length}
                        </td>
                        <td className="tableHeading">
                          {/* <Image
                            src={images.permissionImg}
                            className="permissionImg"
                            alt="permissionImg"
                          /> */}
                          {/* <span className="permissionText">3 Permissions</span> */}
                          <Image
                            src={images.rightArrow}
                            className="rightArrowImg ms-4"
                            alt="image"
                            onClick={() =>
                              router.push(
                                "/user/" + item?._id
                              )
                            }
                          />
                        </td>

                        {/* <td
                          className="tableHeading text-center"
                          onClick={() => {
                            router.push(`/customers/${item?.id}`);
                          }}
                        >
                          <Image
                            src={images.rightArrow}
                            className="cursor"
                            alt="image"
                          />
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <>
                    {" "}
                    <tr>
                      <td colSpan="5" className="text-center">
                        No User found.
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            {supervisorListData?.total_pages > 1 && (
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={supervisorListData?.total_pages}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default SupervisorListing;
