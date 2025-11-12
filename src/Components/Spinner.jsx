import PropTypes from "prop-types";

const Spinner = ({ color = "border-white", size = "w-5 h-5" }) => (
  <div className={`animate-spin rounded-full border-2 ${color} border-t-transparent ${size}`}></div>
);

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default Spinner;
