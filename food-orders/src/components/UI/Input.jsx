import PropTypes from "prop-types";

export const Input = ({ label, id, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} required />
    </p>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};
