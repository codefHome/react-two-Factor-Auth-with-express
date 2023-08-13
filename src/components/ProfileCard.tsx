
// import ReactTooltip from 'react-tooltip'
// import 'react-tooltip/dist/index.css'



import {  useState } from 'react';
import ChildPic from '../assets/child.jpg'
import { Box,  Switch, Typography } from '@material-ui/core';
import { ITwoFactorAuth, updateTwoFactorAuth } from '../api/restApis';
interface IProps{
    email:string;
    fullName:string;

    handleSignOut: VoidFunction;
    setShowProfile:(value:boolean)=>void;
    handleChangePassword:VoidFunction,
  twoFactorAuth:boolean


}
 const ProfileCard = ({email,fullName,twoFactorAuth,handleChangePassword,handleSignOut,setShowProfile}:IProps) => {

  const handleLogOut=()=>{
    handleSignOut();
    setShowProfile(false);
  }
console.log(twoFactorAuth)
const userInfo= JSON.parse(localStorage.getItem('token')!)
const [enableAuth, setEanbleAuth] = useState<boolean>(userInfo.twoFactorAuth);
  const handleChange = async() => {
    setEanbleAuth(!enableAuth);
  const updateData:ITwoFactorAuth={
    email:email,
    twoFactorAuth:!enableAuth
  }
    await updateTwoFactorAuth(updateData)
 
 userInfo.twoFactorAuth=!enableAuth
 localStorage.setItem("token", JSON.stringify(userInfo));
  };



  return (
    <div  className='flex flex-col mr-2 mt-1 bg-white fixed top-16 right-0 w-56 h-auto rounded-2xl'>
<div className='flex pt-4 pb-6 justify-center bg-green-400 h-2/6 '>
{fullName}
</div>
<div className='flex bg-gray-400 h-1/6 justify-center items-center '>
<span className='flex justify-center items-center rounded-full w-16 bg-white h-16 mt-[-25px] ' ><img className='rounded-full w-12 h-12' src={ChildPic} /></span>
</div>

<div className='flex items-center pt-3 flex-col bg-gray-400 h-3/6 '>
    <h5 className=''>
    { fullName }
        </h5>
<h6>
{  email }
</h6>
<Box className="flex flex-col mt-5  text-left" >
<span onClick={handleChangePassword} className='mt-2 cursor-pointer'>
 <Typography style={{ fontSize: '12px' }} className="text-[8px]">Change Password </Typography>
</span>
<span className="flex">
  <Typography  style={{ fontSize: '12px' }} className=" flex justify-center items-center text-[8px]">
  Two Factor Auth 
  </Typography>
 
<Switch
  checked={enableAuth}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>
</span>
<span onClick={handleLogOut} className='cursor-pointer mb-5'>
 <Typography style={{ fontSize: '12px' }} >SignOut </Typography>
</span>

</Box>




</div>
    </div>
  )
}
export default ProfileCard
