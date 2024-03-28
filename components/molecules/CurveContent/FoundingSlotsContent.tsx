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

export const FoundingSlotsContent = () => {
  return (
    <div>
      <Paragraph>
        So, we talked about how only Deity holders can found a{" "}
        <Important>Fellowship</Important>.
      </Paragraph>
      <Paragraph>
        However, Deities are not free to found unlimited{" "}
        <Important>Fellowships</Important>. Each Deity gets an initial{" "}
        <Important>founding slots</Important>; for example, S-tier deities have
        4 initial founding slots.
      </Paragraph>
      <Paragraph>
        Each time a deity founds a fellowship, one of the slots will be used and
        go into a <Important>cooldown</Important>. While a slot is on cooldown,
        it cannot be used to create a fellowship.
      </Paragraph>
      <Paragraph>
        The cooldown of a slot is <Important>1 Week</Important>, so after a
        week, it will be usable again.
      </Paragraph>
      <Paragraph>
        There is a <Important>leveling system</Important> for deities based on
        the fees they collect. After leveling up, the deity gains an additional
        slot.
      </Paragraph>
      <Paragraph>
        It&apos;s expected that high-tier deities level up faster, as they have
        more initial slots and collect more fees. However, a lower-level deity
        with better decisions can also compete with them.
      </Paragraph>
    </div>
  );
};
