import React from 'react';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

const DeleteLabeler = ({
  selectedLabeler,
  setSelectedLabeler,
  clickedDeleteBtn,
  setClickedDeleteBtn,
  labelers,
  setLabelers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredLabeler = Object.keys(selectedLabeler).filter(
    key => selectedLabeler[key] === true
  );
  const selectedNum = filteredLabeler.length;
  const isSelected = selectedNum > 0;

  function buttonTitle() {
    if (clickedDeleteBtn && !isSelected) {
      return '취소';
    } else if (!clickedDeleteBtn) {
      return '라벨러 삭제';
    } else if (clickedDeleteBtn && isSelected) {
      return `라벨러 삭제 (${selectedNum})`;
    }
  }

  const deleteHandler = () => {
    if (isSelected) {
      setIsModalOpen(true);
    } else {
      setClickedDeleteBtn(!clickedDeleteBtn);
    }
  };

  return (
    <>
      <Wrap>
        <DeleteBtn onClick={() => deleteHandler()}>{buttonTitle()}</DeleteBtn>
      </Wrap>
      <ModalWrap isModalOpen={isModalOpen}>
        <DeleteModal
          labelers={labelers}
          setLabelers={setLabelers}
          filteredLabeler={filteredLabeler}
          setSelectedLabeler={setSelectedLabeler}
          setIsModalOpen={setIsModalOpen}
          setClickedDeleteBtn={setClickedDeleteBtn}
        />
      </ModalWrap>
    </>
  );
};

export default DeleteLabeler;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Num = styled.span`
  color: red;
  visibility: ${({ isSelected }) => (isSelected ? 'visible' : 'hidden')};
`;

const DeleteBtn = styled.button`
  margin-left: 0.5rem;
  width: 8rem;
  cursor: pointer;
`;

const ModalWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};
`;
