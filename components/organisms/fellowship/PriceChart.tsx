import styled from "styled-components";

import { useMemo, useState } from "react";
import { PriceHelpersFactory } from "./utils/PriceHelpersFactory";
import { ethers } from "ethers";
import { Row, Col } from "react-grid-system";
import { Spacing } from "../../atoms";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import ReactECharts from "echarts-for-react";


const ChartContainer = styled.div`
  //padding: 0em 2em 0em 0em;
  width: 95%;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

interface PriceChartPrice {
  initialPrice: string;
  diminishingFactor: number;
  initialGrowthRate: number;
  eventualGrowthRate: number;
}

const InputTitle = styled.h4``;


export const PriceChart = ({
  initialPrice,
  diminishingFactor,
  initialGrowthRate,
  eventualGrowthRate,
}: PriceChartPrice) => {
  const [chartScale, setChartScale] = useState(50);

  const { getPriceAtIndex: gpai } = useMemo(
    () =>
      PriceHelpersFactory(
        ethers.utils.parseEther(initialPrice ? initialPrice : "1"),
        ethers.BigNumber.from(initialGrowthRate),
        ethers.BigNumber.from(eventualGrowthRate),
        ethers.BigNumber.from(diminishingFactor),
        ethers.BigNumber.from(10000)
      ),
    [initialPrice, initialGrowthRate, eventualGrowthRate, diminishingFactor]
  );

  const formattedPriceAtIndex = (index: number) => {
    return Number(ethers.utils.formatEther(gpai(ethers.BigNumber.from(index))));
  };

  const prices = Array(11)
    .fill(0)
    .map((v, i) => i * chartScale)
    .map((i) => [i, formattedPriceAtIndex(i)]);

  const option = {
    xAxis: {
      type: "value",
      name: "supply",
    },
    yAxis: {
      type: "value",
      name: "price",
    },
    series: [
      {
        data: prices,
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#DA4167",
        },
        itemStyle: {
          color: "#383838",
        },
      },
    ],
  };

  return (
    <Row>
      <Col md={12}>
        <ChartContainer>
          <ReactECharts option={option} />
        </ChartContainer>
      </Col>
      <Col md={4}></Col>
      <Col md={4}>
        <InputItem>
          <InputTitle>Chart Scale</InputTitle>
          <Spacing spacing="0.5em" />
          <Slider
            styles={{
              rail: {
                background: "#c8c8c8",
              },
              track: {
                background: "#DA4167",
              },
              handle: {
                borderColor: "#DA4167",
                boxShadow: "none !important",
              },
            }}
            min={0}
            value={chartScale}
            max={500}
            onChange={(v) => setChartScale(Number(v))}
          />
        </InputItem>
      </Col>
    </Row>
  );
};
