import { IFormRowProps } from './formRow.interface';
const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  disabled,
  onChange = () => {},
}: IFormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor="" className={name}>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        min={type === 'number' ? 0 : ''}
        name={name}
        defaultValue={defaultValue || ''}
        disabled={disabled}
        onChange={(e) => onChange(e)}
        required
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
