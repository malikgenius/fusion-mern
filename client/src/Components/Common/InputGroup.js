import React from 'react';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
  onFocus
}) => {
  return (
    // Font Awesome Icon at the front just need to pass icon prop
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className="form-control form-control-lg"
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};

export default InputGroup;
