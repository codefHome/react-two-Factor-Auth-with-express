/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import ProfileCard from './ProfileCard';
import ChildPic from '../assets/child.jpg'

/* eslint-disable-next-line */
export interface CommonUiProps {
  email:string;
  fullName:string;
  handleSignOut:VoidFunction
  handleChangePassword:VoidFunction
  twoFactorAuth:boolean
}

export function Header({email,fullName,twoFactorAuth,handleSignOut,handleChangePassword}: CommonUiProps) {
  const[showProfile,setShowProfile]=useState(false)
  const modalRef = useRef<HTMLDivElement>(null);
  const userIconRef=useRef<HTMLDivElement>(null)
  const isMouseDownInsideModal = useRef(false);
  const isMouseDownInsideUserIcon=useRef(false)


const handleUpdate=()=>{
  handleChangePassword()
  setShowProfile(false)
}

useEffect(() => {
  const handleMouseDownInsideModal = () => {
    isMouseDownInsideModal.current = true;
    isMouseDownInsideUserIcon.current = true;
  };

  const handleClickOutsideModal = () => {
    if (!isMouseDownInsideModal.current ) {
      setShowProfile(false);
    }
    if( isMouseDownInsideUserIcon.current && showProfile){
      setShowProfile(false)
    }
    isMouseDownInsideModal.current = false;
    isMouseDownInsideUserIcon.current=false;
  };

  document.addEventListener('mousedown', handleClickOutsideModal);
  modalRef.current?.addEventListener('mousedown', handleMouseDownInsideModal);
  userIconRef.current?.addEventListener('mousedown', handleMouseDownInsideModal);


  return () => {
    document.removeEventListener('mousedown', handleClickOutsideModal);
    modalRef.current?.removeEventListener('mousedown', handleMouseDownInsideModal);
    userIconRef.current?.removeEventListener('mousedown', handleMouseDownInsideModal);
  };
}, []);

  return (
    <>
    <div className='flex flex-row shadow-md'>
      <strong className='flex  lg:pl-5 items-center bg-white lg:w-3/5 w-full lg:text-2xl pl-10 text-sm'>Node test</strong>
    <div className='flex bg-white   w-full h-20 mb-5  justify-end items-center  '>
   
   <span className='mr-5 text-sm hidden lg:block'>Welcome { fullName} </span>
     <div ref={userIconRef} onClick={()=>{
      setShowProfile(!showProfile)}} className='flex w-12 h-12 bg-white rounded-full mr-5 justify-center items-center cursor-pointer'>
     <img className='rounded-full w-10 h-10' src={ChildPic} alt='IMG'/> 
     </div>
    </div>
    </div>
    <div  ref={modalRef}
           className='flex'>
     {showProfile && <ProfileCard 
     email={email}
      fullName={fullName}
      twoFactorAuth={twoFactorAuth}
      handleSignOut={handleSignOut}
      setShowProfile={setShowProfile}
      handleChangePassword={handleUpdate}
      
      />
     }
     </div>
    </>
  );
}

export default Header;
