import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginFetch from "../../../fetch/LoginFetch";

function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    // If user logged in on miEdge (has session already)
    const findUserInfo = () => {
      LoginFetch.findUserInfo()
        .then((json) => {
          console.log("User logged in already...");
          navigate("/admin");
        })
        .catch((ex) => {
          console.log("User not logged in already...");
          navigate("/admin/login");
        });
    };
    findUserInfo();
  }, [navigate]);

  return <div>Trang home</div>;
}

export default Home;
