import React from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import DatePicker from "react-datepicker";

const createJob = () => {
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
              <h4 className="heading16">Create Job Request</h4>
              <p className="text14">Add details for Job request</p>
            </div>
          </div>
        </div>
      </div>
     <form>
     <div className="createJob">
        <div className="row">
          <div className="col-md-12 ">
            <h6 className="heading16">Select Customer</h6>
            <select className="createJobSelect">
              <option>Select Customer</option>
              <option>Select Customer</option>
              <option>Select Customer</option>
              <option>Select Customer</option>
              <option>Select Customer</option>
              <option>Select Customer</option>
              <option>Select Customer</option>
            </select>
          </div>
          <div className="col-md-12 mt-3">
            <h6 className="heading16">Select Role</h6>
            <input
              type="checkbox"
              id="role1"
              name="role1"
              value="role"
              className="roleInput"
            />
            <label for="role1" className="ps-2 roleLable heading16">
              {" "}
              Radiology
            </label>
            <br />
            <input
              type="checkbox"
              id="role2"
              name="role2"
              value="role"
              className="roleInput"
            />
            <label for="role2" className="ps-2 roleLable heading16">
              {" "}
              Scrub Technician
            </label>
            <br />
            <input
              type="checkbox"
              id="role2"
              name="role3"
              value="role"
              className="roleInput"
            />
            <label for="role3" className="ps-2 roleLable heading16">
              {" "}
              Nurse
            </label>
            <br />
            <input
              type="checkbox"
              id="role3"
              name="role4"
              value="role"
              className="roleInput"
            />
            <label for="role4" className="ps-2 roleLable heading16">
              {" "}
              Doctor
            </label>
            <br />
            <input
              type="checkbox"
              id="role4"
              name="role5"
              value="role"
              className="roleInput"
            />
            <label for="role5" className="ps-2 roleLable heading16">
              {" "}
              Doc
            </label>
            <br />
            <input
              type="checkbox"
              id="role5"
              name="role6"
              value="role"
              className="roleInput"
            />
            <label for="role6" className="ps-2 roleLable heading16">
              {" "}
              Skin Specialist
            </label>
            <br />
            <input
              type="checkbox"
              id="role6"
              name="role7"
              value="role"
              className="roleInput"
            />
            <label for="role7" className="ps-2 roleLable heading16">
              {" "}
              Gyno
            </label>
            <br />
            <input
              type="checkbox"
              id="role7"
              name="role8"
              value="role"
              className="roleInput"
            />
            <label for="role8" className="ps-2 roleLable heading16">
              {" "}
              Dentist
            </label>
            <br />
            <br></br>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="filterFormOuter  mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label filterLabel"
              >
                Place Name
              </label>
              <select className="filterSelect">
                <option value="1">Select Sites</option>
                <option value="2">Supervisors</option>
                <option value="3">Customers</option>
                <option value="4">Employees</option>
                <option value="5">Sites</option>
                <option value="6">Territories</option>
                <option value="7">Designation</option>
                <option value="8">Any</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="shiftReqDescription">
              <p className="text12 mb-0">Address</p>
              <div className="editProfileInputOuter">
                <Image
                  src={images.hashtagImg}
                  className="userIconImg"
                  alt="userIcon"
                />
                <input
                  type="text"
                  className="filterInput w-100"
                  placeholder="71445 Evie Turnpike HaydenPass 98676"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="filterFormOuter mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label filterLabel"
              >
                Start Date
              </label>
              <Image
                src={images.calanderIcon}
                className="calanderIcon"
                alt="calenderImg"
              />
              <DatePicker />
            </div>
          </div>
          <div className="col-md-3">
            <div className="filterFormOuter mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label filterLabel"
              >
                End Date
              </label>
              <Image
                src={images.calanderIcon}
                className="calanderIcon"
                alt="calenderImg"
              />
              <DatePicker />
            </div>
          </div>
          <div className="col-md-3">
            <div className="filterFormOuter mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label filterLabel"
              >
                Job Time From
              </label>
              <Image
                src={images.clockIcon}
                className="calanderIcon"
                alt="calenderImg"
              />
              <DatePicker />
            </div>
          </div>
          <div className="col-md-3">
            <div className="filterFormOuter mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label filterLabel"
              >
                Job Time To
              </label>
              <Image
                src={images.clockIcon}
                className="calanderIcon"
                alt="calenderImg"
              />
              <DatePicker />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12 mt-3">
          <div className="shiftReqDescription">
            <p className="text14 mb-0">Description</p>
            <input
              type="text"
              className="filterInput w-100"
              placeholder="write..."
              required
            />
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <button className="commonBtnFill me-3">Create</button>
        </div>
      </div>
      </div>
     </form>
     
    </>
  );
};

export default createJob;
