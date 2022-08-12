import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb(props) {
  const { title, title2, link, link2, title3, link3 } = props;
  return (
    <div className="inner_table">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bridcrumb">
              <Link to="/">Home</Link>
              {link && title && (
                <>
                  {" "}
                  / <Link to={link}>{title}</Link>
                </>
              )}
              {!link && title && <> / {title} </>}
              {link2 && title2 && (
                <>
                  {" "}
                  / <Link to={link2}>{title2}</Link>
                </>
              )}
              {!link2 && title2 && <> / {title2} </>}
              {link3 && title3 && (
                <>
                  {" "}
                  / <Link to={link3}>{title3}</Link>
                </>
              )}
              {!link3 && title3 && <> / {title3} </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
