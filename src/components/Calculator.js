import React from "react";
import styles from "./Calculator.module.css";
import Button from "./Button";
import { evaluate, re } from "mathjs";

const Calculator = () => {
  const [theme, setTheme] = React.useState("dark");
  const [operation, setOperation] = React.useState({
    sign: "",
    inter: "",
    current: "",
    fromOperation: false,
    operation: "",
  });

  const handleClear = () => {
    setOperation({
      sign: "",
      inter: "",
      current: "",
      fromOperation: false,
      operation: "",
    });
  };

  const addOperation = (value) => {
    // setOperation(operation + value);
    setOperation((previousOperation) => {
      return {
        ...previousOperation,
        current: !previousOperation.fromOperation
          ? previousOperation.current + value
          : value,
        fromOperation: false,
        operation: previousOperation.operation + value,
      };
    });
  };

  const handleSign = (value) => {
    setOperation((previousOperation) => {
      if (previousOperation.sign === "") {
        return {
          ...previousOperation,
          sign: value,
          inter: previousOperation.current,
          current: "",
          operation: previousOperation.operation + value,
        };
      } else {
        let result = evaluate(
          `${previousOperation.inter} ${previousOperation.sign} ${
            previousOperation.current
              ? previousOperation.current
              : previousOperation.inter
          }`
        );
        return {
          current: result,
          inter: "",
          sign: "",
          fromOperation: true,
          operation: result,
        };
      }
    });
  };

  const calculate = () => {
    if (operation.sign === "") {
      setOperation((previousOperation) => {
        return {
          ...previousOperation,
          result: "",
          fromOperation: false,
          operation: previousOperation.current,
        };
      });
      return;
    }

    let result = evaluate(
      `${operation.inter} ${operation.sign} ${operation.current}`
    );
    setOperation((previousOperation) => {
      return {
        current: result,
        inter: "",
        sign: "",
        fromOperation: true,
        operation: result,
      };
    });
  };
  return (
    <div>
      <div className={`${styles.calculator} ${styles["calculator-" + theme]}`}>
        <div className={styles["operation-" + theme]}>
          <label>{operation.operation} </label>
          <input className={styles['input-'+theme]} readOnly value={operation.current} />
        </div>
        <div className={styles["btn-container"]}>
          <Button
            handleClick={() => handleSign("/")}
            value="/"
            theme={theme}
            isAction={true}
          />
          <Button handleClick={addOperation} value="%" theme={theme} />
          <Button handleClick={addOperation} value="±" theme={theme} />
          <Button handleClick={handleClear} value="C" theme={theme} />
          <Button
            handleClick={() => handleSign("*")}
            value="x"
            theme={theme}
            isAction={true}
          />
          <Button handleClick={addOperation} value="9" theme={theme} />
          <Button handleClick={addOperation} value="8" theme={theme} />
          <Button handleClick={addOperation} value="7" theme={theme} />
          <Button
            handleClick={() => handleSign("-")}
            value="-"
            theme={theme}
            isAction={true}
          />
          <Button handleClick={addOperation} value="6" theme={theme} />
          <Button handleClick={addOperation} value="5" theme={theme} />
          <Button handleClick={addOperation} value="4" theme={theme} />
          <Button
            handleClick={() => handleSign("+")}
            value="+"
            theme={theme}
            isAction={true}
          />
          <Button handleClick={addOperation} value="3" theme={theme} />
          <Button handleClick={addOperation} value="2" theme={theme} />
          <Button handleClick={addOperation} value="1" theme={theme} />
          <Button
            handleClick={calculate}
            value="="
            theme={theme}
            isAction={true}
          />
          <Button handleClick={addOperation} value="." theme={theme} />
          <Button handleClick={addOperation} value="0" theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
