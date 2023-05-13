import React from "react";
import { useMemo } from "react";
// import { RE_DIGIT } from "../constants/constants";

export type Props = {
  value: string;
  valueLength: number;
  onChangeResult: (value: string) => void;
  colorPoke: string;
};

const ResultCodeField: React.FC<Props> = ({
  value,
  valueLength,
  onChangeResult,
  colorPoke,
}) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];
    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (char) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  //Handle change input in OTP box
  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value;
    targetValue = 1 ? targetValue : " ";
    const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1);
    onChangeResult(newValue);
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;
    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  //Handle delete
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }
    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }
    const targetValue = target.value;
    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);
    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }
    focusToPrevInput(target);
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  //Handle on focus
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;
    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };

  //Handle keydown Next
  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  //Handle keydown Prev
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  return (
    <div className="flex w-full max-w-[800px] gap-[10px]">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="h-[60px] w-[40px] max-w-[800px] gap-[10px] text-center p-[4px] rounded-[8px] text-[32px] font-[700] uppercase focus:border-main focus:outline-main"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};

export default ResultCodeField;
