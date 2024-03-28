import styled from "styled-components";
import { Button } from "../molecules";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface LearningCurveControlsProps {
  nextName: string | undefined;
  backName: string | undefined;
  onNext: Function | undefined;
  onBack: Function | undefined;
}

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
