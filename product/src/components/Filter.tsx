import React, { useCallback, ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { Priority } from "./todo/form";
import { useDispatch } from "react-redux";
import { filterRequest } from "../lib/reducers/todo";

const Filter = () => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState<number>(1);
  const [date, setDate] = useState<number>(1);
  const [complete, setComplete] = useState<number>(1);
  useEffect(() => {
    let filter = {
      priority,
      date,
      complete,
    };
    dispatch(filterRequest(filter));
  }, [priority, date, complete, dispatch]);
  const onChangePriority = useCallback((e: ChangeEvent<HTMLDivElement>) => {
    const value = Number((e.target as HTMLInputElement).value);
    setPriority(value);
  }, []);
  const onChangeDate = useCallback((e: ChangeEvent<HTMLDivElement>) => {
    const value = Number((e.target as HTMLInputElement).value);
    setDate(value);
  }, []);
  const onChangeComplete = useCallback((e: ChangeEvent<HTMLDivElement>) => {
    const value = Number((e.target as HTMLInputElement).value);
    setComplete(value);
  }, []);

  return (
    <StyleFilter>
      <div className="title">완료목록</div>
      <Priority
        size="small"
        priorityText={["끄기", "미완료", "완료"]}
        name="filter_complete"
        onChangePriority={onChangeComplete}
        priority={complete}
      />
      <div className="title">날짜</div>
      <Priority
        size="small"
        priorityText={["끄기", "오름", "내림"]}
        name="filter_date"
        onChangePriority={onChangeDate}
        priority={date}
      />
      <div className="title">중요도</div>
      <Priority
        size="small"
        priorityText={["끄기", "낮음", "보통", "중요"]}
        name="filter_priority"
        onChangePriority={onChangePriority}
        priority={priority}
      />
    </StyleFilter>
  );
};

const StyleFilter = styled.div`
  .title {
    font-size: 15px;
    color: #777;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  padding: 10px;
  text-align: center;
`;

export default Filter;
