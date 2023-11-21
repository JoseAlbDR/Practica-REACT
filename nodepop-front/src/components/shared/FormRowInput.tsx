import { IFormRowProps } from '../../interfaces/formRow.interface';

const FormRowInput = ({
  type,
  name,
  labelText,
  defaultValue,
  disabled,
  onChange = () => {},
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
        defaultValue={defaultValue || ''}
        disabled={disabled}
        onChange={onChange}
        required
        className="form-input"
      />
    </div>
  );
};

export default FormRowInput;
