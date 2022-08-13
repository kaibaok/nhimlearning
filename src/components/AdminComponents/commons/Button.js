function Button(props) {
  return (
    <button
      className={`${props.className ?? "btn btn-primary btn-lg "} `}
      disabled={props.disabled}
      onClick={props.onClick}
      style={props.style}
    >
      {props.icon}
      {props.spiner && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      {props.label && <span> {props.label}</span>}
    </button>
  );
}

export default Button;
