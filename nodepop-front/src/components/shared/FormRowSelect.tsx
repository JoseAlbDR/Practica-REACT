import { SubmitFunction } from 'react-router-dom';
import { RefObject } from 'react';

interface IFormSelectProps {
  name: string;
  types: string[];
  selected?: string;
  onChange?: SubmitFunction;
  formRef?: RefObject<HTMLFormElement>;
  disabled?: boolean;
}
const FormRowSelect = ({
  name,
  types,
  selected = '',
  disabled,
}: IFormSelectProps) => {
  console.log({ selected });

  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {name}
      </label>
      <select name={name} id={name} className="form-input">
        {types.map((type) => (
          <option
            key={type}
            value={type}
            disabled={disabled}
            selected={type === selected}
          >
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
