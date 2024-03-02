import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useCookie } from "react-use";
import { useUserStore } from "../../../store/store";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
const MentorSideBar = [
  {
    icon: "/images/sidebarsvgs/dashboard.svg",
    activeIcon: "/images/sidebarsvgs/dashboard-active.svg",
    name: "Dashboard",
    path: "/mentor",
  },
  {
    icon: "/images/sidebarsvgs/timetable.svg",
    activeIcon: "/images/sidebarsvgs/time-table-active.svg",
    name: "Timetable",
    path: "/mentor/timetable",
  },
  {
    icon: "/images/sidebarsvgs/practice.svg",
    activeIcon: "/images/sidebarsvgs/practice-active.svg",
    name: "Courses",
    path: "/mentor/courses",
  },
  {
    icon: "/images/sidebarsvgs/practice.svg",
    activeIcon: "/images/sidebarsvgs/practice-active.svg",
    name: "White Board",
    path: "/mentor/whiteboard",
  },
  {
    icon: "/images/sidebarsvgs/practice.svg",
    activeIcon: "/images/sidebarsvgs/practice-active.svg",
    name: "Teaching",
    path: "/mentor/teaching",
  },
  {
    icon: "/images/sidebarsvgs/practice.svg",
    activeIcon: "/images/sidebarsvgs/practice-active.svg",
    name: "Rules & Regulations",
    path: "/mentor/rules",
  },
  {
    icon: "/images/sidebarsvgs/practice.svg",
    activeIcon: "/images/sidebarsvgs/practice-active.svg",
    name: "Submission Points",
    path: "/mentor/submission",
  },

  {
    icon: "/images/sidebarsvgs/profile.svg",
    activeIcon: "/images/sidebarsvgs/user-active.svg",
    name: "Profile",
    path: "/mentor/profile",
  },
];

export const MentorSideBarMenu = ({ isShowMiniMentorSidebar }) => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const currentPathName = location.pathname || "";
  const [, , deleteLoggedIn] = useCookie("maang");
  const [loggedIn] = useCookie("maang");
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [counter, setCounter] = useState(0);

  // console.log(counter);
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const fetchCounter = async () => {
      if (loggedIn) {
        try {
          const response = await axios.get(
            `${ApiBaseURL}mentor-management/rules-regulation/`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );

          const apiCounter = response.data.counter;
          const message = response.data.message;

          setCounter(apiCounter);

          if (message === 0) {
            navigate("/mentor/rules");
            setHasRedirected(true);
          }
        } catch (error) {
          // console.error("Error fetching counter:", error);
        }
      }
    };

    fetchCounter();
  }, [loggedIn, hasRedirected, navigate]);

  useEffect(() => {
    const fetchCounter = async () => {
      if (loggedIn) {
        try {
          const response = await axios.get(
            `${ApiBaseURL}mentor-management/rules-regulation/`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );

          const apiCounter = response.data.counter;
          setCounter(apiCounter);
        } catch (error) {
          // console.error("Error fetching counter:", error);
        }
      }
    };

    fetchCounter();
  }, [loggedIn]);

  // console.log("token", `Token ${JSON.parse(loggedIn).token}`);

  const LogoutMenu = () => {
    if (isShowMiniMentorSidebar) {
      return (
        <div className="mobile-menu-item">
          <img
            src="/images/sidebarsvgs/logout.svg"
            className="cursor-pointer"
            alt="navigation-item-icon"
            onClick={() => logout()}
          />
        </div>
      );
    }

    return (
      <div className="mt-2.5">
        <div
          className="w-52 h-11 rounded-lg py-2 pl-2.5 flex cursor-pointer"
          onClick={() => logout()}
        >
          <img
            src="/images/sidebarsvgs/logout.svg"
            alt="navigation-item-icon"
          />
          <span className="text-current pl-2.5 pt-0.5">Logout</span>
        </div>
      </div>
    );
  };

  const DesktopMenuItem = ({ idx, item, activeImg, activeClass }) => {
    const { name, path } = item;

    const isRulesPage = window.location.pathname === "/mentor/rules";

    const hoverMessage = "Please agree to Rules & Regulations to access this";
    if (name === "White Board") {
      return (
        <div
          className={`mt-2.5 ${activeClass} ${
            isShowMiniMentorSidebar ? "mobile-menu-item" : ""
          }`}
          key={idx}
        >
          <a href="/whiteboard.htm" target="_blank" rel="noopener noreferrer">
            <div className={`w-52 h-11 rounded-lg py-2 pl-2.5 flex`}>
              <img src={activeImg} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          </a>
        </div>
      );
    }
    if (name === "Rules & Regulations" && isRulesPage) {
      return (
        <div className={`mt-2.5 ${activeClass}`} key={idx}>
          <Link to={path}>
            <div className="w-52 h-11 rounded-lg py-2 pl-2.5 flex">
              <img src={activeImg} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          </Link>
        </div>
      );
    }

    if (!isRulesPage) {
      return (
        <div className={`mt-2.5 ${activeClass}`} key={idx}>
          <Link to={path}>
            <div className="w-52 h-11 rounded-lg py-2 pl-2.5 flex">
              <img src={activeImg} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div
        className={`mt-2.5 non-clickable ${activeClass}`}
        key={idx}
        title={hoverMessage}
      >
        <div className="w-52 h-11 rounded-lg py-2 pl-2.5 flex">
          <img src={activeImg} alt="navigation-item-icon" />
          <span className="text-current pl-2.5 pt-0.5">{name}</span>
        </div>
      </div>
    );
  };

  const MobileMenuItem = ({ idx, path, item, activeImg, activeClass }) => {
    const { name } = item;

    return (
      <Link to={path}>
        <div key={idx} className={`mobile-menu-item ${activeClass}`}>
          <img src={activeImg} alt="navigation-item-icon" />
        </div>
      </Link>
    );
  };

  async function logout() {
    try {
      await axios.post(
        `${ApiBaseURL}api/auth/logout/`,
        {},
        {
          headers: {
            Authorization: "Token " + user.token,
          },
        }
      );
    } catch {
      // console.error("Unable to logout from server");
    }

    deleteLoggedIn();
    removeAllUser();
    window.location.href = "/";
  }

  return (
    <div>
      {MentorSideBar.map((item, idx) => {
        const { icon, activeIcon, path, name } = item;
        const activeClass = currentPathName === path ? "active-menu" : "";
        const activeImg = currentPathName === path ? activeIcon : icon;
        const isClickable =
          counter >= 1 || currentPathName.startsWith("/mentor/rules");
        // const isClickable = counter >= 1 || path === "Rules & Regulations";

        if (isClickable) {
          if (isShowMiniMentorSidebar) {
            return (
              <MobileMenuItem
                key={idx}
                idx={idx}
                path={path}
                item={item}
                activeClass={activeClass}
                activeImg={activeImg}
              />
            );
          }
          return (
            <DesktopMenuItem
              key={idx}
              idx={idx}
              item={item}
              activeClass={activeClass}
              activeImg={activeImg}
            />
          );
        } else {
          // Render non-clickable menu item (you can customize the appearance)
          return (
            // <DesktopMenuItem
            //   key={idx}
            //   className={`mt-2.5 non-clickable ${activeClass}`}
            //   idx={idx}
            //   item={item}
            //   activeClass={activeClass}
            //   activeImg={activeImg}
            // />
            <div key={idx} className={`flex mt-6 non-clickable ${activeClass}`}>
              <img src={icon} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          );
        }
      })}
      <LogoutMenu />
    </div>
  );
};
