import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, value, error, placeholder}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
    <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        className="form-control"
        onChange={onChange}
        value = {value}
        placeholder={placeholder}
         />
       {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextInput;
