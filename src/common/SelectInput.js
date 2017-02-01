import React, {PropTypes} from 'react';

const SelectInput = ({name, label, value, onChange, options, error, defaultOption}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select className="selectpicker form-control"
                name={name}
                value={value}
                onChange={onChange} >
            <option value="">{defaultOption}</option>
            {options.map((option) => <option key={option.value} value={option.value}>{option.text}</option> )}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  defaultOption: PropTypes.string,
  error: PropTypes.string
};

export default SelectInput;
