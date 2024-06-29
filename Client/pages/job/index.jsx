import React from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter()
  return (
   <>
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="shiftRequestFilter">
          <div>
            <h3 className="headingGreen20 mb-0">All Jobs </h3>
            <p className="text14 mb-0">Jobs</p>
          </div>
          <div className="shiftRequestRight">
          <div className="editBtnRounded" onClick={()=>{router.push("/job/createJob")}}>
          <i className="fa-solid fa-plus"></i>       
            <span className="ps-2">Create Job</span></div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
    <div className="col-md-12">
      <div className="jobTable">
      <table className='commonTable'>
        <thead>
          <tr>
            <th className='tableHeading'>Location</th>
            <th className='tableHeading'>Date</th>
            <th className='tableHeading'>Request For</th>
            <th className='tableHeading'>Request To</th>
            <th className='tableHeading'>Request Created on</th>
            <th className='tableHeading'>Assign To</th>
            <th className='tableHeading'>Action</th>
            <th className='tableHeading text-center'>View Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tableHeading'><Image src={images.locationIcon} className="locationImg" alt="locationIcon"/>Mercy Hospital, Tamp,FL <br/><span className='text12'>1744 Evie Turnpike Hayden Pass 8956...</span></td>
            <td className='tableHeading'><Image src={images.calanderDark} alt="calenderIcon" className="calenderImg"/><span className="ps-1">24 Aug - 18 Sep, 2022 </span><br/><Image src={images.clockIcon} alt="clockIcon"/> <span className="ps-1">05 pm - 10pm</span></td>
            <td className='tableHeading'><button className='requestForBtn'>Nurse</button></td>
            <td className='tableHeading'><Image src={images.customerImg} alt="customerImg"className="jobcustomerImg"/><span className="ps-2">
            John Smith</span></td>
            <td className='tableHeading'>16 Aug, 2022</td>
            <td className='tableHeading'><button className='assignToSelectBtn'>Select</button></td>
            <td className='tableHeading'>
              <Image src={images.deleteIcon} className='me-2 cursor' alt='img'/>
              <Image src={images.penIcon} className='ms-2 cursor' alt='img'/>
            </td>
            <td className='tableHeading text-center'>
              <Image src={images.rightArrow} className='cursor' alt='img'/>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
   </>
  );
};

export default index;
