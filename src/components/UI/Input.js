import React from "react";
import { useController } from "react-hook-form";
import { inputUI } from "./styles";

export default function Input(props) {
  const { field, fieldState } = useController(props);
  return (
    <div>
      <label htmlFor="email-address" className="sr-only">
        {props.name}
      </label>
      <input
        {...field}
        placeholder={props.name}
        className={inputUI}
        type={props.type}
        required
      />
    </div>
  );
}
