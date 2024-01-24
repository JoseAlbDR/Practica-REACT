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
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {name}
      </label>
      <select
        name={name}
        id={name}
        className="form-input"
        defaultValue={selected}
      >
        {types.map((type) => (
          <option key={type} value={type} disabled={disabled}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
