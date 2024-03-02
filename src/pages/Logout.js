import { useUserStore } from "./../store/store";
import { useCookie } from "react-use";
import axios from "axios";
import { useEffect } from "react";
import { ApiBaseURL } from "../components/ApiConfig";

const Logout = () => {
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [, , deleteLoggedIn] = useCookie("maang");
  const user = useUserStore((state) => state.user);

  async function logout() {
    // await axios.get(
    //   `${process.env.REACT_APP_API_URL}/logout`
    // );

    try {
      await axios.post(
        `${ApiBaseURL}api/auth/logout/`,
        null,
        {
          headers: {
            Authorization: "Token " + user.token,
          },
        }
      );
    } catch {
      console.error("unable to logout from server");
    }

    deleteLoggedIn();
    removeAllUser();
    // updateUser(false);
    document.location.replace("/");
  }

  useEffect(() => {
    logout();
  });

  return "Logging Out";
};

export default Logout;
