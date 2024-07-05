import React from "react";
import Image from "next/image";
import * as images from "../../utilities/images.js";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { deleteAPost } from "@/redux/slices/web/index.js";
import { useRouter } from "next/router.js";
import { useAuthSelector } from "@/redux/selector/auth.js";

const Post = (props) => {
  const data = props?.data;
  const authSelector = useAuthSelector()
  console.log(props)
  const router = useRouter()
  const dispatch = useDispatch();
  const handlePostDelete = (id) => {
    const params = { id };
    swal({
      title: "Delete Post",
      text: "Are you sure? You want to delete this Post",
      className: "swalCustom",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteAPost({
            ...params,
            cb(res) {
              swal(
                "Post Deleted",
                `Hey! You successfully deleted Post`
              ).then(() => {
                props?.deletePost(id);
              });
            },
          })
        );
      }
    });
  };


  return (
    <div className="card mb-3 position-relative">
      {/* Delete Icon */}
     {  props?.isClient && (authSelector?.userInfo?.data?.data?._id==data?.userId?._id ||authSelector?.userInfo?.data?.data?._id==data?.userId) && <button
        className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
        onClick={() => {
          handlePostDelete(data?._id);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </button>}

      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <Image
            src={data?.userId?.image ?? images.doctorIcon}
            width={50}
            height={50}
            className="rounded-circle me-3"
          />
          <div>
            <p className="mb-0">{data?.userId?.userName}</p>
            <p className="text-muted small">
              Posted on: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <p>{data?.message}</p>

        {Array.isArray(data?.images) && data?.images.length > 0 && (
          <div className="row row-cols-2 row-cols-md-3 g-3 text-center">
            {data?.images.map((item, index) => (
              <div key={index} className="col">
                <Image
                  src={item}
                  height={200}
                  width={200}
                  className="img-fluid rounded"
                />
              </div>
            ))}
          </div>
        )}
      {data?.isLiked ?  <i className="fa-solid fa-heart"></i> :  <i className="fa-regular fa-heart"></i> } 
      </div>
    </div>
  );
};

export default Post;
