import styled from "styled-components";
import { createPortal } from "react-dom";
import { ReactNode } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../../molecules";

const ModalContainer = styled.div`
  position: fixed;
  z-index: 10000;
  background-color: rgba(50, 50, 50, 0.2);
  backdrop-filter: blur(3px);

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalPanel = styled.div`
  background-color: white;
  min-width: 360px;
  border: 2px solid #383838;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border-bottom: 1px solid #383838;
`;

const ModalTitle = styled.h2``;

const ModalClose = styled.div``;

const CloseButton = styled.div`
  border: 2px solid black;
  padding: 2px;
  width: 27px;
  height: 27px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  transition: 2ms;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const ModalContent = styled.div``;

interface ModalProps {
  open: boolean;
  onClose: Function;
  children: ReactNode;
  title: string;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return open ? (
    createPortal(
      <ModalContainer onClick={() => onClose()}>
        <ModalPanel onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalClose onClick={() => onClose()}>
              <CloseButton>
                <IoCloseSharp />
              </CloseButton>
            </ModalClose>
          </ModalHeader>
          <ModalContent>{children}</ModalContent>
        </ModalPanel>
      </ModalContainer>,
      document.body
    )
  ) : (
    <></>
  );
};
