import { useReducer } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import OperationButton from "./components/OperationButton/OperationButton";

// Creating the different actions that are going to be happening
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

// Applying reducer, where state is the initial state
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    default:
      return {};
  }
};

const App = () => {
  // Calling the useReducer to set the operations value
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });

  return (
    <>
      <div className="container">
        <div className="output">
          <div className="previous-operand">
            {previousOperand} {operation}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <OperationButton digit="AC" dispatch={dispatch} cancel />
        <OperationButton digit="9" dispatch={dispatch} />
        <OperationButton operation="/" dispatch={dispatch} sign />
        <OperationButton operation="*" dispatch={dispatch} sign />
        <Button digit="7" dispatch={dispatch} />
        <Button digit="8" dispatch={dispatch} />
        <Button digit="9" dispatch={dispatch} />{" "}
        <OperationButton operation="-" dispatch={dispatch} sign />
        <Button digit="4" dispatch={dispatch} />
        <Button digit="5" dispatch={dispatch} />
        <Button digit="6" dispatch={dispatch} />
        <div className="div3">
          <OperationButton operation="+" dispatch={dispatch} sign plus />
          <OperationButton operation="=" dispatch={dispatch} equal />
        </div>
        <Button digit="1" dispatch={dispatch} />
        <Button digit="2" dispatch={dispatch} />
        <Button digit="3" dispatch={dispatch} />
        <Button div4 digit="0" dispatch={dispatch} />
        <Button digit="." dispatch={dispatch} />
      </div>
    </>
  );
};

export default App;
