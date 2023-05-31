import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const {user, logout} = UserAuth()

  const navigate = useNavigate()

  const handleSignOut = async()=>{
    try{
      await logout()
      navigate('/')
    }
    catch(e){
      console.log(e.message)
    }
  }

  const handleClick = ()=>{
    setShowMenu(!showMenu)
  }

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">CryptoBase</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div className="hidden md:block">
          <Link to="/account" className="p-4">Account</Link>
          <button onClick={handleSignOut} className="bg-button text-btnText px-5 py-2 ml-2 rounded-xl shadow-lg hover:shadow-2xl">Sign Out</button>
        </div>
      ):(
      <div className="hidden md:block">
        <Link to="/signin">
          <button className="p-4 hover:text-accent">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="bg-button text-btnText px-5 py-2 ml-2 rounded-xl shadow-lg hover:shadow-2xl">Sign Up</button>
        </Link>
      </div>
      )}
      {/* Menu Icon */}
      <div className="md:hidden block cursor-pointer z-10" onClick={handleClick}>
        {showMenu ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={20}/> }
      </div>
      {/* Mobile Menu */}
      
      <div className={showMenu ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10':'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between  ease-in duration-300'}>
        <ul className="w-full p-4 ">
          <li onClick={handleClick} className="border-b py-6 ">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleClick} className="border-b py-6 ">
            <Link to="/account">Account</Link>
          </li>
          <li className=" py-6 ">
            <ThemeToggle />
          </li>
        </ul>
        {user?.email?(
          <div className="flex flex-col w-full p-4 ">
          <Link to="/signup">
            <button onClick={handleClick && handleSignOut} className="w-full my-2 p-3 bg-button text-btnText rounded-xl shadown-xl">Sign Out</button>
          </Link>
        </div>
        ):(
          <div className="flex flex-col w-full p-4 ">
          <Link to="/signin">
            <button onClick={handleClick} className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-xl shadow-xl">Sign In</button>
          </Link>
          <Link to="/signup">
            <button onClick={handleClick && handleSignOut} className="w-full my-2 p-3 bg-button text-btnText rounded-xl shadown-xl">Sign Up</button>
          </Link>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
