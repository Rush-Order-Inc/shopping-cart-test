import { FunctionComponent, useState } from "react";

import classes from "./quantifier.module.scss";

export type Operation = "decrease" | "increase";

interface Props {
  removeProductCallback: (productId: number) => void;
  handleUpdateQuantity: (productId: number, operation: Operation) => void;
  productId: number;
}

export const Quantifier: FunctionComponent<Props> = ({
  removeProductCallback,
  handleUpdateQuantity,
  productId,
}) => {
  const [value, setValue] = useState<number>(1);

  const reduce = (): void => {
    handleUpdateQuantity(productId, "decrease");

    setValue((prevState) => {
      const updatedValue = prevState - 1;
      if (updatedValue === 0) {
        removeProductCallback(productId);
      }
      return updatedValue;
    });
  };

  const increase = (amount: number = 1): void => {
    for (let i = 0; i < amount; i++) {
      handleUpdateQuantity(productId, "increase");
      setValue(value + 1);
    }
  };

  return (
    <div className={classes.quantifier}>
      <input
        type="button"
        value="-1"
        className={classes.buttonMinus}
        onClick={reduce}
      />
      <input
        type="number"
        step="1"
        max=""
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className={classes.quantityField}
      />
      <input
        type="button"
        value="+1"
        className={classes.buttonPlus}
        onClick={increase}
      />
      <input
        type="button"
        value="+2"
        className={classes.buttonPlus}
        onClick={() => increase(2)}
      />
    </div>
  );
};
