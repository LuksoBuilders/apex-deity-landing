import styled from "styled-components";
import { useState, useMemo, useEffect, Dispatch, SetStateAction } from "react";
import { ethers } from "ethers";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TextField } from "../../molecules";
import { ValueSelector } from "../general";
import { Spacing } from "../../atoms";

import { Row, Col } from "react-grid-system";

import ReactECharts from "echarts-for-react";

import { PriceHelpersFactory } from "./utils/PriceHelpersFactory";

const Paragraph = styled.p`
  color: #393939;
  font-weight: 300;
`;

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

const InputGrowthItem = styled.div`
  display: flex;
  align-items: center;
  height: 79px;
  justify-content: space-between;
  margin-top: 0.5em;
`;

const InputTitle = styled.h4``;

const Options = styled.div`
  display: flex;

  margin-top: 1em;
`;

interface SelectableOptionProps {
  active?: boolean;
}

const SelectableOption = styled.div<SelectableOptionProps>`
  border: 2px solid #383838;
  background-color: ${({ theme, active }) =>
    !active ? "#f8f8f8" : theme.primary};
  color: ${({ theme, active }) => (active ? "#f8f8f8" : "#383838")};
  padding: 0.25em 1em;
  margin-right: 1em;
  box-shadow: 3px 3px #383838;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.primaryLight : "#e8e8e8"};
  }
`;

interface PriceConfigurationProps {
  initialPrice: string;
  setPrice: Dispatch<SetStateAction<string>>;
  diminishingFactor: number;
  setDiminishingFactor: Dispatch<SetStateAction<number>>
  initialGrowthRate: number;
  setIGR: Dispatch<SetStateAction<number>>
  eventualGrowthRate: number;
  setEGR: Dispatch<SetStateAction<number>>
}

export const PriceConfiguration = ({
  initialPrice,
  setPrice,
  diminishingFactor,
  setDiminishingFactor,
  initialGrowthRate,
  setIGR,
  eventualGrowthRate,
  setEGR,
}: PriceConfigurationProps) => {
  const [priceOption, setPriceOption] = useState(0);

  const [chartScale, setChartScale] = useState(50);

  useEffect(() => {
    switch (priceOption) {
      case 0:
        setPrice("10");
        setDiminishingFactor(5000);
        setIGR(50);
        setEGR(1);
        break;
      case 1:
        setPrice("10");
        setIGR(0);
        setEGR(0);
        break;
      case 2:
        setPrice("10");
        setDiminishingFactor(5000);
        setIGR(10);
        setEGR(10);
        break;
      case 3:
        break;
    }
  }, [priceOption]);

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

  // gI -> initial growth factor
  // gE -> eventual growth factor
  // d ->  diminishing factor
  // i -> tokenIndex

  const getEffectiveGrowthFactor = (
    gI: number,
    gE: number,
    d: number,
    i: number
  ) => {
    return gE + ((gI - gE) * (d / 10000)) / (d / 10000 + i);
  };

  const getPriceAtIndexByLastPrice = (lastPrice: number, i: number) => {
    return lastPrice * getEffectiveGrowthFactor(1.5, 1, 10000, i);
  };

  const getPriceAtIndex = (initialPrice: number, i: number) => {
    if (i === 1) {
      return initialPrice;
    }

    // Recursive case
    const previousPrice = getPriceAtIndex(initialPrice, i - 1);
    return (
      previousPrice *
      getEffectiveGrowthFactor(
        initialGrowthRate,
        eventualGrowthRate,
        diminishingFactor,
        i
      )
    );
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

  const renderFields = () => {
    switch (priceOption) {
      case 0:
        return (
          <Row>
            <Col md={6}>
              <TextField
                label="Initial Price in $LYX"
                value={initialPrice}
                onChange={setPrice}
              />
            </Col>
          </Row>
        );
      case 1:
        return (
          <Row>
            <Col md={6}>
              <TextField
                label="Initial Price in $LYX"
                value={initialPrice}
                onChange={setPrice}
              />
            </Col>
          </Row>
        );

      case 2:
        return (
          <Row>
            <Col md={6}>
              <TextField
                label="Initial Price in $LYX"
                value={initialPrice}
                onChange={setPrice}
              />
            </Col>
            <Col md={6}>
              <InputGrowthItem>
                <InputTitle>Growth Rate</InputTitle>
                <ValueSelector
                  value={initialGrowthRate}
                  setValue={(v) => {
                    setIGR(v);
                    setEGR(v);
                  }}
                  steps={initialGrowthRate >= 10 ? 5 : 1}
                  renderHelper={(v) => `${Number(v) / 100}%`}
                />
              </InputGrowthItem>
            </Col>
          </Row>
        );

      case 3:
        return (
          <Row>
            <Col md={6}>
              <TextField
                label="Initial Price in $LYX"
                value={initialPrice}
                onChange={setPrice}
              />
            </Col>
            <Col md={6}>
              <InputItem>
                <InputTitle>Diminishing Factor</InputTitle>
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
                  value={diminishingFactor}
                  max={10000}
                  onChange={(v) => setDiminishingFactor(Number(v))}
                />
              </InputItem>
            </Col>
            <Col md={6}>
              <InputGrowthItem>
                <InputTitle>Starting Growth Rate</InputTitle>
                <ValueSelector
                  value={initialGrowthRate}
                  setValue={setIGR}
                  steps={initialGrowthRate >= 10 ? 5 : 1}
                  renderHelper={(v) => `${Number(v) / 100}%`}
                />
              </InputGrowthItem>
            </Col>
            <Col md={6}>
              <InputGrowthItem>
                <InputTitle>Eventual Growth Rate</InputTitle>
                <ValueSelector
                  value={eventualGrowthRate}
                  setValue={setEGR}
                  steps={eventualGrowthRate >= 10 ? 5 : 1}
                  renderHelper={(v) => `${Number(v) / 100}%`}
                  maxValue={initialGrowthRate}
                />
              </InputGrowthItem>
            </Col>
          </Row>
        );
    }
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Options>
            <SelectableOption
              onClick={() => setPriceOption(0)}
              active={priceOption === 0}
            >
              Balance
            </SelectableOption>
            <SelectableOption
              onClick={() => setPriceOption(1)}
              active={priceOption === 1}
            >
              Constant
            </SelectableOption>
            <SelectableOption
              onClick={() => setPriceOption(2)}
              active={priceOption === 2}
            >
              Exponential
            </SelectableOption>
            <SelectableOption
              onClick={() => setPriceOption(3)}
              active={priceOption === 3}
            >
              Custom
            </SelectableOption>
          </Options>
        </Col>
      </Row>
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
      <Spacing spacing="2.5em" />
      {renderFields()}
    </div>
  );
};
