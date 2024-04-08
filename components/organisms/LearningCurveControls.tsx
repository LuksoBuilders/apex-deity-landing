import styled from "styled-components";
import { Button } from "../molecules";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { LearningCurveControlsProps } from "../utils/interfaces";

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const LearningCurveControls = ({
  nextName,
  backName,
  onNext,
  onBack,
}: LearningCurveControlsProps) => {
  return (
    <ControlContainer>
      <div>
        {!!backName && (
          <Button onClick={onBack}>
            <ButtonLabel>
              <GrLinkPrevious style={{ marginRight: "1em" }} /> {backName}
            </ButtonLabel>
          </Button>
        )}
      </div>
      <div>
        {!!nextName && (
          <Button onClick={onNext}>
            <ButtonLabel>
              {nextName} <GrLinkNext style={{ marginLeft: "1em" }} />
            </ButtonLabel>
          </Button>
        )}
      </div>
    </ControlContainer>
  );
};
