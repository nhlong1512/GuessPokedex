import React from 'react'

export type Props = {
    value: string;
    valueLength: number;
    onChangeResult: (value: string) => void;
  };

const ResultCodeField:React.FC<Props> = ({value, valueLength, onChangeResult}) => {
  return (
    <div className="otp-group">
      {['p', 'i', 'k', 'a', 'c', 'h', 'u', 'l','f','f'].map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="otp-input"
          value={digit}
        />
      ))}
    </div>
  )
}

export default ResultCodeField