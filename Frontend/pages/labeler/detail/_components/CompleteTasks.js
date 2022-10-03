import React from 'react';
import styled from 'styled-components';

const CompleteTasks = ({ goToTaskDetail }) => {
  return (
    <Wrap>
      <BoldText>완료한 테스크</BoldText>
      <Tasks>
        {TASK_LIST.map((task, idx) => {
          return (
            <TaskBox key={idx}>
              <Task onClick={() => goToTaskDetail(task.name)}>{task.name}</Task>
              <Text>카테고리</Text>
              <Text>정답률:{task.correctRate}</Text>
            </TaskBox>
          );
        })}
      </Tasks>
    </Wrap>
  );
};

export default CompleteTasks;

const Wrap = styled.div`
  height: 50%;
  padding-top: 1rem;
`;
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tasks = styled.ul`
  margin-top: 1rem;
  background-color: white;
  width: 17rem;
  height: 80%;
  padding: 1rem;
  overflow: auto;
`;

const Task = styled.li`
  font-size: 1rem;
  margin-bottom: 0.8rem;
  width: fit-content;

  cursor: pointer;

  :hover {
    color: red;
  }
`;

const TASK_LIST = [
  { id: 1, name: 'task42', correctRate: '21%' },
  { id: 2, name: 'task48', correctRate: '59%' },
  { id: 3, name: 'task95', correctRate: '48%' },
];

const TaskBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 0.7rem;
`;
