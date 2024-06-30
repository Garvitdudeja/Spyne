import withAuth from "@/authentication/withauth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDashboard } from "@/redux/slices/web";
import Post from "@/Components/Common/Post";
import CustomModal from "@/Components/Common/CustomModal";
import NewPost from "@/Components/Modals/NewPost";
import * as images from "@/utilities/images";
import Image from "next/image";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({page: 1, limit:10})
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const [key, setKey] = useState(Math.random());

  const getDashboardAction = (filter)=>{
    const params = {
      ...filter
    }
    dispatch(
      getDashboard({...params,
        cb: (res) => setData(res?.data),
      })
    );
  }




  useEffect(() => {
   getDashboardAction(filter)
  }, [filter]);

  const handleAddPostModal = () => {
    setModalDetail({
      show: true,
      title: "Add new Post",
      flag: "",
    });
    setKey(Math.random());
  };

  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  const handleDeletePost = (id) => {
    setData((prev) => {
      const newList = prev.data.filter((item) => item._id != id);
      return { ...prev, data: newList };
    });
  };



  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="heading20 mb-0">Overview</h2>

          <form>
                <div className="customerSearch">
                  <Image
                    src={images.searchIcon}
                    alt="icon"
                    className="customerSearchIcon"
                  />
                  <input
                    type="search"
                    onChange={e=>{setFilter(prev=>({...prev,search:e.target.value}))}}
                    placeholder="Search here.."
                    className="customerSearchInput"
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
          <button className="btn btn-primary ms-3" onClick={handleAddPostModal}>
            Add Post
          </button>
        </div>
        {data?.data?.length > 0 ? (
          data?.data?.map((item) => (
            <Post
              data={item}
              key={item.id}
              deletePost={(id) => {
                handleDeletePost(id);
              }}
            />
          ))
        ) : (
          <p>No posts found</p>
        )}
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
        header={modalDetail.title}
        child={
          <NewPost
            close={handleOnCloseModal}
            updatePost={(newpost) => {
              setData((prev) => ({ ...prev, data: [newpost, ...prev.data] }));
              handleOnCloseModal();
            }}
          />
        }
        onCloseModal={() => {
          handleOnCloseModal();
        }}
      />
    </>
  );
};

export default withAuth(Dashboard);
