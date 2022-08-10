export function TextInput(props) {
  return (
    <input
      value={props.value}
      type={props.type ?? "text"}
      className={props.className}
      required={props.required}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}
