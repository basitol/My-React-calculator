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
      // Making sure I don't have moore than one 0 starts the operation
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      // Makes sure I don't have multiple periods
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    // Actions for choosing operation
    case ACTIONS.CHOOSE_OPERATION:
      // Makes sure our operation doesn't do anything if we have not done something before
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      // This part makes sure our previousoperand is the new current operand
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      // Returns previous calculation to evaluate new value
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    // Returns an empty state when you clear
    case ACTIONS.CLEAR:
      return {};

    // Evaluate values when using the equals sign
    case ACTIONS.EVALUATE:
      // When one of the operation needed to evaluate is not complete, equal sign won't run
      if (
        state.operation == null ||
        state.previousOperand == null ||
        state.currentOperand == null
      ) {
        return state;
      }

      // Sets out the evaluate operation
      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
      };

    default:
      return {};
  }
};

//Defining the evaluate function
const evaluate = ({ currentOperand, previousOperand, operation }) => {
  // Assigning previous and current values to a variable
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";

  let computation = "";
  // All evealuation needed
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    default:
      return "";
  }

  return computation.toString();
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
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>Ac</button>
        <button>Del</button>
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
          <button
            className="equal"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
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
