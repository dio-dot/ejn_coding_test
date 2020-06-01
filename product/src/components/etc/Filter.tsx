import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Radio } from "./Radio";
import { Filter as FilterType, filterRequest } from "../../lib/reducers/todo";

interface Props {}

const Filter: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<FilterType>({
    priority: 0,
    deadline: 0,
    complete: 0,
  });

  const onFilterChange = useCallback(
    (e) => {
      const key = e.target.name.substr(7, 10);
      console.log(key);
      let _filter = { ...filter, [key]: Number(e.target.value) };
      setFilter(_filter);
      dispatch(filterRequest(_filter));
    },
    [filter, dispatch]
  );

  return (
    <FilterStyle>
      <Title>완료</Title>
      <Radio
        items={["끄기", "미완료", "완료"]}
        name="filter_complete"
        onChange={onFilterChange}
        value={filter.complete}
      />
      <Title>날짜</Title>
      <Radio
        items={["끄기", "오름", "내림"]}
        name="filter_deadline"
        onChange={onFilterChange}
        value={filter.deadline}
      />
      <Title>중요도</Title>
      <Radio
        items={["끄기", "낮음", "보통", "중요"]}
        name="filter_priority"
        onChange={onFilterChange}
        value={filter.priority}
      />
    </FilterStyle>
  );
};

const FilterStyle = styled.div`
  padding: 10px;
  text-align: center;
`;
const Title = styled.div`
  font-size: 15px;
  color: #777;
  margin-top: 6px;
  margin-bottom: 6px;
`;

export default Filter;
