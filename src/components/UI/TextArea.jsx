import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../../assets/icons/warning.svg';

const TextArea = React.forwardRef(({
  name,
  className, 
  label, 
  ref, 
  labelStyle, 
  value, 
  onChange, 
  valid, 
  touched,
  errorMessage,
}) => (
  <div className="form-group">
    <label className={labelStyle} htmlFor={name}>
      {label}
      <textarea
        name={name}
        className={className}
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
    {!valid && touched
      ? (
        <div className="error">
          <p className="error-message">
            <img className="error-icon" src={ErrorIcon} alt="error" />
            {errorMessage}
          </p>
        </div>
      ) 
      : null}
  </div>
));

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ref: PropTypes.func.isRequired,
  labelStyle: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default TextArea;
