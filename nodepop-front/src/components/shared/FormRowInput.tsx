import { IFormRowProps } from '../../interfaces/formRow.interface';

const FormRowInput = ({
  required,
  type,
  name,
  labelText,
  disabled,
  onChange = () => {},
  onClick = () => {},
}: IFormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        min={type === 'number' ? 0 : ''}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export default FormRowInput;
