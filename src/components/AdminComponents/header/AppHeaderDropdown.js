import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilEnvelopeOpen,
  cilLockLocked,
  cilSettings,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "../../../assets/images/avatars/8.jpg";
import { useNavigate } from "react-router-dom";

const AppHeaderDropdown = () => {
  let navigate = useNavigate();

  const location = (name) => {
    navigate(name);
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem href="#" onClick={() => location("/alerts")}>
          <CIcon icon={cilBell} className="me-2" />
          Alerts
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#" onClick={() => location("/messages")}>
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="#" onClick={() => location("/profile")}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#" onClick={() => location("/settings")}>
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={() => location("/logout")}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
