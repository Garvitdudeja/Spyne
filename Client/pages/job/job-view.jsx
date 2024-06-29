import React from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";

const jobView = () => {
  return (
    <>
      <div className="commonHeader mb-3">
      <div className="hospitalDetail">
            <div
              className="backArrowBtn"
            >
              <Image src={images.leftArrowLong} alt="leftArrowImg" />
            </div>
            <div className="hospitalDetailOuter">
              <div className="hospitalDetailText">
                <h4 className="heading16">Job Detail</h4>
              </div>
            </div>
          </div>
        
        <div className="jobViewBtn">
          <button className="editBtnRounded">
            <Image src={images.penIconGreen} className="me-2" alt="img" />
            <span>Edit Details</span>
          </button>
          <button className="editBtnRounded ms-3">
          <i className="fa-regular fa-copy me-2"></i>
            <span>Create Duplicate Job</span>
          </button>
        </div>
      </div>
      <div className="col-md-12">
      <div className="nurseDetailOuter mb-3">
          <div className="nurseDetailIconOuter">
            <Image src={images.doctorIcon} alt="img" />
          </div>
          <div className="nurseDetailText">
            <div className="nurseTag">Nurse</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="requestCreateCommon mb-3">
          <p className="text14 mb-2">Request Created on</p>
          <Image src={images.calanderDark} className="me-2" alt="img" />
          <span className="requestCommonDate">16 Aug, 2024</span>
        </div>
        <div className="requestCreateCommon mb-3">
          <p className="text14 mb-2">Scheduled (Hourly)</p>
          <Image src={images.calanderDark} className="me-2" alt="img" />
          <span className="requestCommonDate">24 Aug - 18 Sep, 2024</span>
          <div className="scheduleRequestCommon">
            <Image src={images.clockIcon} className="me-2" alt="img" />
            <span className="requestCommonDate">05 pm - 10pm</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="shiftReqDescription">
            <p className="text14 mb-2">Description</p>
            <p className="text14 mb-2">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="col-md-12">
          <button className="commonBtnFill me-3">Assign To</button>
        </div>
      </div>
    </>
  );
};

export default jobView;
