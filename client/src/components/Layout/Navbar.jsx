import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {

    const [ show, setShow ] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/user/logout",
            {
              withCredentials: true,
            }
          );
          toast.success(response.data.message);
          setIsAuthorized(false);
          navigateTo("/login");
        } catch (error) {
          toast.error(error.response.data.message), setIsAuthorized(true);
        }
    };
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logohb.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          {user && user.role !== "Company" && (
            <li>
              <Link to={"/job/instjob"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
          )}
          <li>
            {
                user && ( user.role === "Company")?
                (
                    <Link to = {`/application/company/jobapp`}  onClick={() => setShow(false)}>
                        APPLICANT'S APPLICATIONS
                    </Link>
                ):(
                    null
                )
            }
            {
                user && user.role === "Student"?
                (
                    <Link to = {`/application/my`}  onClick={() => setShow(false)}>
                        MY APPLICATIONS
                    </Link>
                ):(
                    null
                )
            }
            {
               user && user.role === "Tnp"?
               (
                   <Link to = {`/application/tnp/allapp`}  onClick={() => setShow(false)}>
                       APPLICANTS APPLICATIONS
                   </Link>
               ):(
                   null
               )
            }
          </li>
          {user && user.role === "Company" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/companyseeall"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button  onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar