import styled from "styled-components";

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 19px;
  color: #222;
  margin-bottom: 1em;
`;

const Important = styled.span`
  font-weight: 500;
`;

export const BackerBuckContent = () => {
  /*const bar = (initial: number, increase: number, length: number) => {
    let a = [];
    for (var i = 0; i < length; i++) {
      console.log(i, length);
      if (a.length === 0) {
        a.push(initial);
      } else {
        const lastItem: number = a[a.length - 1];
        a.push(lastItem * increase);
      }
    }
    return a;
  };

  function sumArray(arr: Array<number>) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  const items = bar(1, 1.01, 500);
  const total = sumArray(items);

  console.log(items, total);*/

  return (
    <div>
      <Paragraph>
        After an <Important>Artisan</Important> has its own{" "}
        <Important>Fellowship</Important>, users can mint Artisan&apos;s
        personal token, which is called <Important>Backer Buck</Important>.
      </Paragraph>

      <Paragraph>
        Backer Bucks are LSP7 non-divisible tokens related to each. Minting
        price starts at 1 $LYX time one is minted the minting price increases
        1%.{" "}
      </Paragraph>

      <Paragraph>
        These 1% increase will be applied on the last mint price, resulting in
        exponential growth.
      </Paragraph>

      <Paragraph>
        Examples <br />
        1st token: <Important> 1 $LYX</Important> <br />
        100th token: <Important>2.74 $LYX</Important> <br />
        200th token: <Important>7.3 $LYX</Important> <br />
        500th token: <Important>144.52 $LYX</Important> <br />
        1000th token: <Important>20959 $LYX</Important> <br />
      </Paragraph>

      <Paragraph>
        Remember that the <Important>Backer Bucks</Important> are bound to a
        fellowship. This means BackerBucks of fellowship A are completely
        different from BackerBucks of fellowship B.
      </Paragraph>
      <Paragraph>
        There will be a secondary market for selling the backer bucks.
      </Paragraph>
    </div>
  );
};
