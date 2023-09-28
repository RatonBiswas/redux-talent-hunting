import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { toggleSidebar } from "../features/user/userSlice";
const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">Nav Links</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
