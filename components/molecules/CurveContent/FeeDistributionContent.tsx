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

export const FeeDistributionContent = () => {
  return (
    <div>
      <Paragraph>
        When a <Important>Fellowship</Important> generates income, it will be
        split. <Important>80%</Important> goes to the{" "}
        <Important>Artisan</Important>, and <Important>20%</Important> becomes
        the <Important>total fee</Important>.
      </Paragraph>
      <Paragraph>
        Each Deity has a <Important>direct fee</Important> percentage; for
        example, Tier S deities have a 2% direct fee. From the total fee, this
        direct fee amount will be deducted and will become the{" "}
        <Important>system fee</Important>.
      </Paragraph>
      <Paragraph>
        These system fees then go to a <Important>fee collector</Important>, and
        each deity can receive their share of system fees based on their tier.
      </Paragraph>
      <Paragraph>
        For example, imagine Zeus, an S-tier deity, founds a{" "}
        <Important>Fellowship</Important> for Ninja. Now, someone mints a Ninja
        BackerBuck for 100 $LYX. Ninja receives 80 $LYX, and 20 $LYX becomes the
        total fee.
        <br />
        Since Zeus has a 2% direct fee, he will directly receive 2 $LYX from the
        fee.
        <br />
        Now, 18 $LYX goes to the fee collector. Each deity will receive a
        portion of that 18 $LYX.
        <br />
        For example, each S-tier deity, including Zeus, will receive 1% of 18
        $LYX, which is 0.18 $LYX. So Zeus will receive 2.18 $LYX in total.
      </Paragraph>
    </div>
  );
};
