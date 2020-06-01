import React, { ChangeEvent, memo } from "react";
import styled from "styled-components";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  items: string[];
  name: string;
  value: any;
}

export const Radio: React.FC<Props> = ({ onChange, items, name, value }) => {
  return (
    <RadioStyle>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              id={`${name}_${index}`}
              value={index}
              name={name}
              checked={Number(value) === index}
              onChange={onChange}
            />
            <label htmlFor={`${name}_${index}`}>{item}</label>
          </div>
        );
      })}
    </RadioStyle>
  );
};

const RadioStyle = styled.div`
  display: flex;
  justify-content: center;
  input[type="radio"] {
    display: none;
  }
  label {
    display: inline-block;
    background-color: #e9e9e9;
    color: #a2a2a2;
    padding: 0px 3px;
    font-size: 13px;
    flex: 1;
    height: 34px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    min-width: 34px;
  }
  input[type="radio"]:checked + label {
    background-color: rgb(32, 201, 151);
    color: #fff;
  }
`;
export default memo(Radio);
