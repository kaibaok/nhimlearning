import { Button } from "../commons";

function LoadingButton(props) {
  const isLoading = props.isLoading ?? false;
  const disabled = props.disabled ?? false;
  return (
    <Button
      className={props.className}
      size={props.size}
      disabled={isLoading || disabled}
      color={isLoading ? "primary" : props.color}
      onClick={props.onClick}
      style={props.style ?? { color: "#ffffff" }}
      label={
        isLoading ? props.labelLoading ?? "Loading..." : props.label ?? "Button"
      }
      spiner={isLoading ? true : false}
    />
  );
}

export default LoadingButton;
