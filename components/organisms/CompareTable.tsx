import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { MdOutlineDone } from "react-icons/md";
import { Row, Col, Visible } from "react-grid-system";
import { Title } from "../atoms";

const TableContainer = styled.div`
  overflow-x: auto; /* Enable horizontal scrolling for mobile */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid black;
  background-color: white;
`;

const TableRow = styled.tr`
  border-bottom: 2px solid black;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 20px 16px;
`;

const Container = styled.div`
  position: relative;
`;

const PositionedImage = styled(Image)`
  position: absolute;
  //right: -18px;
  bottom: 0px;
  right: 5px;
`;

const Important = styled.span`
  font-weight: 500;
  font-size: 22px;
`;

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 19px;
  color: #222;
  margin-bottom: 1em;
  margin-top: 1.5em;
`;

export const CompareTable = () => {
  return (
    <Container>
      <Title>Compare Deities</Title>
      <div style={{ marginBottom: "2em" }}></div>
      <Row>
        <Col lg={11} md={11} sm={12}>
          <TableContainer>
            <StyledTable>
              <tbody>
                <TableRow>
                  <TableCell>Tier</TableCell>
                  <TableCell>Direct Fee</TableCell>
                  <TableCell>System Fee</TableCell>
                  <TableCell>Supply</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>IS and VP *</TableCell>
                  <TableCell>Early Access</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Important>S</Important>
                  </TableCell>
                  <TableCell>2%</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>100 $LYX</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>
                    <MdOutlineDone style={{ width: 28, height: 28 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Important>A</Important>
                  </TableCell>
                  <TableCell>1.5%</TableCell>
                  <TableCell>0.75%</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>75 $LYX</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <MdOutlineDone style={{ width: 28, height: 28 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Important>B</Important>
                  </TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>0.5%</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>50 $LYX</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <MdOutlineDone style={{ width: 28, height: 28 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Important>C</Important>
                  </TableCell>
                  <TableCell>0.5%</TableCell>
                  <TableCell>0.25%</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>25 $LYX</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <MdOutlineDone style={{ width: 28, height: 28 }} />
                  </TableCell>
                </TableRow>
              </tbody>
            </StyledTable>
          </TableContainer>
        </Col>
        <Visible md lg xl xxl>
          <Col lg={1} md={1} sm={2}>
            <PositionedImage
              width={143}
              height={300}
              unoptimized={true}
              alt={"erato"}
              src={"/deities/erato.png"}
            />
          </Col>
        </Visible>
      </Row>
      <Paragraph>
        IS and VP*: This stands for Initial Supply and Voting Power, learn more
        in the learning curve.
      </Paragraph>
    </Container>
  );
};
