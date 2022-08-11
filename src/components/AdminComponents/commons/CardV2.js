import { Checkbox } from "@mui/material";
import ReactPlayer from "react-player";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Card(props) {
  return (
    <div
      className={`card card-bordered  ${props.className}`}
      onClick={props.onClick}
      {...props.getProps}
    >
      {props.image && <img src={props.image} className="card-img-top" />}
      {props.video && (
        <div className="card-img-top">
          <ReactPlayer
            width="100%"
            height="100%"
            url={props.video}
            controls={true}
            alt="video"
          />
        </div>
      )}
      <div className="card-inner">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.subTitle && <p className="card-text">{props.subTitle}</p>}
        {props.body && <div>{props.body}</div>}
      </div>
      {props.closeButton && (
        <HighlightOffIcon
          onClick={props.onClickCloseButton}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "white",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />
      )}

      {props.checkButton && (
        <Checkbox
          style={{
            position: "absolute",
            left: 15,
            padding: 0,
          }}
          onChange={props.onChange}
          checked={props.isChecked}
        />
      )}
    </div>
  );
}

export default Card;
