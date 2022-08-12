import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppAuth from "../../../AppAuth";

function Logout() {
  let navigate = useNavigate();

  useEffect(() => {
    AppAuth.logout().then(() => {
      navigate("/admin/login");
    });
  }, [navigate]);

  return <div />;
}

export default Logout;
