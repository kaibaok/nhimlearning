import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilChatBubble,
  cilAccountLogout,
  cilDevices,
  cibElectron,
  cibSemaphoreci,
  cilLocationPin,
  cilLanguage,
  cilOpentype,
  cilGrain,
  cilImage,
  cilBook,
  cilBookmark,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import AppConfig from "./AppConfig";

let _nav = [
  {
    component: CNavItem,
    name: "Home Admin",
    to: "/admin",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
];

if (AppConfig.enabledModuleMedia)
  _nav.push({
    component: CNavItem,
    name: "Media",
    to: "/admin/media",
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  });

if (AppConfig.enabledModuleChat)
  _nav.push({
    component: CNavItem,
    name: "Chat",
    to: "/admin/chat",
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  });

if (AppConfig.enabledModuleDevices) {
  _nav.push({
    component: CNavTitle,
    name: "Devices",
  });
  _nav.push({
    component: CNavGroup,
    name: "Devices",
    to: "/admin/devices",
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Devices",
        to: "/admin/devices",
        icon: <CIcon icon={cibElectron} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Types Device",
        to: "/admin/types-device",
        icon: <CIcon icon={cibSemaphoreci} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Areas",
        to: "/admin/areas",
        icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
      },
    ],
  });
}

if (AppConfig.enabledModuleLearning) {
  _nav.push({
    component: CNavTitle,
    name: "Learning English",
  });
  _nav.push({
    component: CNavGroup,
    name: "English",
    to: "",
    icon: <CIcon icon={cilLanguage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Book",
        to: "/admin/english-books",
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Lesson",
        to: "/admin/lessons",
        icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Question",
        to: "/admin/questions",
        icon: <CIcon icon={cilGrain} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Question Type",
        to: "/admin/question-types",
        icon: <CIcon icon={cilOpentype} customClassName="nav-icon" />,
      },
    ],
  });
}

_nav.push({
  component: CNavTitle,
  name: "Action",
});
_nav.push({
  component: CNavItem,
  name: "Logout",
  to: "/admin/logout",
  icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
});
export default _nav;
