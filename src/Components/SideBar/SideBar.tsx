import { FaUserPlus, FaUsersViewfinder } from 'react-icons/fa6';
import { LuCircleUser } from 'react-icons/lu';
import { MdOutlineHomeWork } from 'react-icons/md';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { TbLogout, TbLogout2 } from 'react-icons/tb';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function SideBar() {
  let{userData}:any=useContext(AuthContext) ;
  let [collapsed,setCollapsed]=useState(false);

  let toggleCollapse=()=>{
    setCollapsed(! collapsed)
  }
  return (
    <div className='sidebarContainer vh-100'>
    <Sidebar collapsed={collapsed} className='vh-100'>
      {collapsed? <TbLogout2 size={25} className='mx-2' onClick={toggleCollapse}/>  :<TbLogout size={25} className='mx-2' onClick={toggleCollapse} />}
      <div className="text-center my-1">
        <img src={userData?.image} alt='profile image' className='w-50  rounded-circle'/>
        <h5>{userData?.firstName}</h5>
        <h6 className='text-warning'>Admin</h6>
      </div>

  <Menu
   
  >
    <MenuItem icon={<MdOutlineHomeWork />} component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem icon={<FaUsersViewfinder />} component={<Link to="/dashboard/users-list" />}> Users</MenuItem>
    <MenuItem icon={<FaUserPlus />} component={<Link to="/dashboard/add-user" />}> Add user</MenuItem>
    <MenuItem icon={<LuCircleUser />} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
    <MenuItem  icon={<RiLogoutCircleLine />}> Log out</MenuItem>
  </Menu>
</Sidebar>;
    </div>
  )
}
