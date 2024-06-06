import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Row, Col } from "react-grid-system";
import { RedSpan } from "../../atoms";
import { ethers } from "ethers";

const GET_GLOBAL_VARS = gql`
  query GlobalVars {
    globalVars {
      totalFeeCollected
      totalRaisedAmount
      divineDungDepotBalance
    }
  }
`;

const MetricsContainer = styled.div``;

const MetricSquare = styled.div`
  border: 2px solid #383838;
`;

const MetricTitle = styled.h4`
  padding: 1em;
  border-bottom: 1px solid #383838;
  text-align: center;
  font-weight: 300;
`;

const MetricValue = styled.h1`
  padding: 1em;
  text-align: center;
`;

interface MetricsProps {}

export const Metrics = ({}: MetricsProps) => {
  const { data, loading, error } = useQuery(GET_GLOBAL_VARS);

  if (!data) return null;

  const globalVars = data.globalVars;

  return (
    <MetricsContainer>
      <Row>
        <Col md={6}>
          <MetricSquare>
            <MetricTitle>Total Raised Amount</MetricTitle>
            <MetricValue>
              {Number(
                ethers.utils.formatEther(globalVars.totalRaisedAmount)
              ).toFixed(0)}{" "}
              $LYX
            </MetricValue>
          </MetricSquare>
        </Col>
        <Col md={6}>
          <MetricSquare>
            <MetricTitle>Divine Dung Depot</MetricTitle>
            <MetricValue>
              {" "}
              {Number(
                ethers.utils.formatEther(globalVars.divineDungDepotBalance)
              ).toFixed(0)}{" "}
              $HSHT
            </MetricValue>
          </MetricSquare>
        </Col>
      </Row>
    </MetricsContainer>
  );
};
