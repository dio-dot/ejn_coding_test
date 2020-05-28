import React, { ChangeEvent, memo } from "react";
import styled from "styled-components";
interface Props {
  onChangePriority: (e: ChangeEvent<HTMLDivElement>) => void;
  priority: number;
  name: string;
  priorityText: string[];
  size?: string;
}

const Priority: React.FC<Props> = memo(
  ({ onChangePriority, priority, priorityText, name, size }) => {
    // const priorityText = ;
    return (
      <PriorityStyle size={size}>
        {priorityText.map((text, index) => {
          let number = index + 1;
          return (
            <div key={index}>
              <input
                type="radio"
                id={`${name}_${number}`}
                value={number}
                name={name}
                checked={priority === number}
                onChange={onChangePriority}
              />
              <label htmlFor={`${name}_${number}`}>{text}</label>
            </div>
          );
        })}
      </PriorityStyle>
    );
  }
);

const PriorityStyle = styled.div`
  display: flex;
  /* width: 150px; */
  justify-content: center;
  input[type="radio"] {
    display: none;
  }
  label {
    display: inline-block;
    background-color: #e9e9e9;
    color: #a2a2a2;
    padding: ${(props) => (props.size === "small" ? "0px 3px" : "6px 3px")};
    font-size: 13px;
    cursor: pointer;
    flex: 1;
    line-height: 22px;
    text-align: center;
  }
  input[type="radio"]:checked + label {
    background-color: rgb(32, 201, 151);
    color: #fff;
  }
`;

export default Priority;
