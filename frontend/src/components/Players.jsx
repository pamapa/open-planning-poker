import React from "react";

import Player from "./Player";

export default function Players({ players }) {
  return (
    <div className={styles.cardsContainer}>
      {players.map((player) => (
        <Player player={player} />
      ))}
    </div>
  );
}
