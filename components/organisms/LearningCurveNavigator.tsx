import { useState } from "react";
import { Button } from "../molecules/Button";
import { motion } from "framer-motion";
import { BsChevronBarExpand } from "react-icons/bs";
import { BsChevronContract } from "react-icons/bs";

export interface LearningCurveNavigatorProps {
  items: Array<string>;
  selectedItem: number;
  setSelectedItem: (item: number) => void;
}

export const LearningCurveNavigator = ({
  items,
  selectedItem,
  setSelectedItem,
}: LearningCurveNavigatorProps) => {
  const [expanded, setExpanded] = useState(false);

  const itemHeight = 50;

  const getContainerHeight = () => {
    return `${expanded ? itemHeight * items.length : itemHeight * 3}px`;
  };

  const getNavigatorOffset = () => {
    if (expanded) return "0px";
    if (selectedItem === 0 || selectedItem === 1) return "0px";
    if (selectedItem === items.length - 1)
      return `${-50 * (selectedItem - 2)}px`;
    return `${-50 * (selectedItem - 1)}px`;
  };

  return (
    <div style={{ position: "relative" }}>
      <motion.div
        animate={{
          height: getContainerHeight(),
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          animate={{
            position: "absolute",
            top: getNavigatorOffset(),
          }}
        >
          {items.map((item, i) => (
            <div key={item} style={{ marginBottom: "1px" }}>
              <Button
                fullwidth
                color={selectedItem === i ? "black" : "black"}
                variant={selectedItem === i ? "contained" : "outlined"}
                onClick={() => setSelectedItem(i)}
              >
                {item}
              </Button>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          position: "absolute",
          bottom: -15,
          left: "130px",
          background: !expanded ? "#F06A8B" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 35,
          height: 35,
          borderRadius: 100,
          color: expanded ? "#DA4167" : "black",
          cursor: "pointer",
          border: `2px solid ${expanded ? "#DA4167" : "black"}`,
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <BsChevronContract style={{ width: 25, height: 25 }} />
        ) : (
          <BsChevronBarExpand style={{ width: 25, height: 25 }} />
        )}
      </motion.div>
    </div>
  );
};

export default LearningCurveNavigator;
