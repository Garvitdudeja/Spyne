import { addNewPost } from "@/redux/slices/web";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const NewPost = (props) => {
  const [data, setData] = useState({ message: "", images: [] });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      ...data,
    };
    dispatch(
      addNewPost({
        ...params,
        cb(res) {
          try{
            console.log(res,'res')
          props?.updatePost(res)
          props.close();
          }catch(e){
            console.log(e,"eeeeeee")
          }
        },
      })
    );
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <textarea
                className="form-control"
                rows={4}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                placeholder="Enter your message here"
              />
            </div>
          </div>
        </div>

        {data.images.length > 0 && (
          <div className="row mb-3">
            {data.images.map((item, index) => (
              <div key={index} className="col-2">
                <Image src={item} height={50} width={50} alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        )}

        <div className="row mb-3 mt-3">
          <div className="col-md-12">
            <CldUploadWidget
              uploadPreset="ml_default"
              onSuccess={(results) => {
                setData((prev) => ({ ...prev, images: [...prev.images, results.info.secure_url] }));
                console.log("Public ID", results.info.secure_url);
              }}
            >
              {({ open }) => (
                <button className="btn btn-primary" onClick={open}>
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-success">
              Add Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
