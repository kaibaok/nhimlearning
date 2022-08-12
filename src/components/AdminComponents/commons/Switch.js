export function Switch(props) {
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={props.id ?? "customSwitch"}
        onChange={props.onChange}
        value={props.value}
      />
      <label
        className="custom-control-label"
        htmlFor={props.id ?? "customSwitch"}
      >
        {props.label}
      </label>
    </div>
  );
}
