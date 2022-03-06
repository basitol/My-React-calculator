import { ACTIONS } from "../../App";
import "./OperationButton.css";

const OperationButton = ({
  dispatch,
  operation,
  equal,
  sign,
  cancel,
  plus,
}) => {
  return (
    <button
      className={`${sign ? "sign" : ""} ${cancel ? "cancel" : ""} ${
        plus ? "plus" : ""
      }`}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
