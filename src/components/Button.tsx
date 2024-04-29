import { Button as PrButton } from "primereact/button";
import React from "react";

export function Button(props : React.ComponentProps<typeof PrButton>) {
  return (
    <PrButton {...props}>
      {props.children}
    </PrButton>
  );
}