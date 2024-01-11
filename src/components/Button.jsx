import { Button as PrButton } from "primereact/button";

export function Button(props) {
  return (
    <PrButton {...props}>
      {props.children}
    </PrButton>
  );
}