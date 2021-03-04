import React from "react";

const getAverage = (players) => {
  if (!players) {
    return null;
  }

  const allCards = getCardValues(players);

  const sum = allCards.reduce((a, b) => a + b, 0);

  return sum ? sum / allCards.length : 0;
};

export default function Average({ players }) {
  return (
    <Typography variant='subtitle2'>
      {"Average: "}
      {showValue && getAverage(players)}
    </Typography>
  );
}
