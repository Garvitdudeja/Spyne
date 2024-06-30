import Image from 'next/image'
import React from 'react'
import * as images from "@/utilities/images"
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/auth'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuthSelector } from '@/redux/selector/auth'



const Navbar = (props) => {
  const dispatch = useDispatch()
  const authSelector = useAuthSelector()
  console.log(authSelector)
  const pathname = usePathname()
  const router = useRouter()
  const handleLogout = ()=>{
    dispatch(logout({
      cb(res){
        if (res.status == 200){
          router.push("/login")
        }
      }
    }))
  }
  return (
    <div className='navbar'>
    <h1 className='heading30'>Dashboard</h1>
    <div className='navLeftSide'>
      <ul className='navList'>
        <li>
          <div className='navChat'>
            <Image src={images.chatIcon} alt='chatImg'/>
          </div>
        </li>
        <li>
          <div className='navNotification'>
            <Image src={images.notificationIcon} alt='notificationImg'/>
          </div>
        </li>
        {/* <li>
          <button className='assignShiftBtn'>
            Assign Shift/Task
          </button>
        </li> */}
        <li>
        
        {props?.isClient &&  <button className="profileBtn" onClick={()=>{router.push('/user/'+authSelector?.userInfo?.data?.data?._id)}}>
            <Image src={images.paitentIcon} className='me-2' alt='paitentImg'/>
            <span>Profile</span>
          </button>}
         
          {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-2"></i> Logout</button></li>
          </ul> */}
       
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Navbar