import { SubmitFunction } from 'react-router-dom';
import { changePriceNameUrl } from '../../utils/changePriceNameUrl';
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
  formRef,
  onChange = () => {},
  disabled,
}: IFormSelectProps) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {name === 'sale' ? 'type' : name}
      </label>
      <select
        name={name === 'category' ? 'tags' : name}
        id={name}
        className="form-input"
        defaultValue={selected}
        onChange={(e) => {
          if (e.currentTarget.form) changePriceNameUrl(formRef);
          return onChange(e.currentTarget.form);
        }}
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
