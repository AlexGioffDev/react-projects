import PropTypes from "prop-types";
export const ErrorComponent = ({ title, message }) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

ErrorComponent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
