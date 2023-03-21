import React from "react";

interface InputInterface {
  type: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  alt?: string | undefined;
  dataTestid?: string | undefined;
  name?: string | undefined;
}
const Input = (props: InputInterface) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className="input input-bordered w-full"
      required={props.required}
      value={props.value}
      onChange={props.onChange}
      alt={props.alt}
      data-testid={props.dataTestid}
      name={props.name}
    />
  );
};

export default Input;
