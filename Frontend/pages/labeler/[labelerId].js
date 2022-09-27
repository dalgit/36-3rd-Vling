import { useRouter } from 'next/router';
import styled from 'styled-components';
import TaskList from './_components/TaskList';
import { useState } from 'react';
import { gql } from '@apollo/client';
import OngoingTasks from './_components/OngoingTasks';
import sehanClient from '../../components/apollo-client-sehan';
import CompleteTasks from './_components/CompleteTasks';

function labelerDetail(props) {
  const router = useRouter();
  const labelerId = router.query.labelerId;
  const [selectedTask, setSelectedTask] = useState('');

  return (
    <Wrap>
      <TitleWrap>
        <Email>Email: {labelerId}</Email>
        <DeleteBtn>라벨러 삭제</DeleteBtn>
      </TitleWrap>
      <TaskContainer>
        <SubWrap>
          <OngoingTasks />
          <CompleteTasks />
        </SubWrap>
        <TaskListBox>
          <ListBoxTitle>
            <BoldText>테스크 리스트</BoldText>
            <SelectedText>{selectedTask}</SelectedText>
            <button>할당</button>
          </ListBoxTitle>
          <TotalTasks>
            <TaskList
              taskData={props.data.tasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </TotalTasks>
        </TaskListBox>
      </TaskContainer>
    </Wrap>
  );
}

export default labelerDetail;

export async function getServerSideProps() {
  const { data } = await sehanClient.query({
    query: GET,
  });

  return {
    props: {
      data: data,
    },
  };
}

///////// graphQL ///////////
const GET = gql`
  query {
    tasks {
      name
      id
    }
  }
`;

///// 스타일컴포넌트 //////
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Wrap = styled.div`
  width: 90%;
  height: 90%;
  padding: 1rem;
  position: relative;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Email = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4rem;
`;

const TaskContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TaskListBox = styled.div`
  width: 45%;
`;

const TotalTasks = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  height: 20rem;
  background-color: white;
  overflow: auto;
`;

const ListBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 1rem;
`;

const SelectedText = styled.div`
  color: #08088a;
  font-weight: bold;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;