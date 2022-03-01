import { ACTIONS } from "../../App";
import "./button.css";

const Button = ({ dispatch, digit, div4 }) => {
  return (
    <button
      className={`${div4 ? "div4" : ""}`}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default Button;
