import { Button as PrButton } from "primereact/button";

export function Button(props) {
  return (
    <PrButton {...props} pt={{ root: { className: 'ui' }, ...props.pt }}>
      {props.children}
    </PrButton>
  );
}