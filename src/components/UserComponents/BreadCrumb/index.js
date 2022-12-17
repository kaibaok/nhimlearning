import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb(props) {
  const { title, title2, link, link2, title3, link3 } = props;
  return (
    <nav>
      <ul class="breadcrumb breadcrumb-arrow">
        <li class="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>

        {link && title && (
          <li class="breadcrumb-item">
            <Link to={link}>{title}</Link>
          </li>
        )}
        {!link && title && <li class="breadcrumb-item">{title} </li>}
        {link2 && title2 && (
          <li class="breadcrumb-item">
            <Link to={link2}>{title2}</Link>
          </li>
        )}
        {!link2 && title2 && <li class="breadcrumb-item">{title2}</li>}
        {link3 && title3 && (
          <li class="breadcrumb-item">
            <Link to={link3}>{title3}</Link>
          </li>
        )}
        {!link3 && title3 && <li class="breadcrumb-item active">{title3}</li>}
      </ul>
    </nav>
  );
}

export default BreadCrumb;
