import PropTypes from "prop-types";

export const Button = ({ children, textOnly, className, ...props }) => {
  let cssClass = textOnly ? "text-button" : "button";
  cssClass += " " + className;

  return (
    <button {...props} className={cssClass}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  textOnly: PropTypes.bool,
  className: PropTypes.string,
};
