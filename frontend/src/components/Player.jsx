import React from "react";

const getCard = (value, showValue) => {
  if (value) {
    return (
      <>{showValue ? <Card cardName={value} /> : <Card cardName={"cover"} />}</>
    );
  }

  return <Card />;
};

export default function Player({ player, showValue, me }) {
  return (
    <div className={styles.cardContainer} key={player.userId}>
      {getCard(player.card, showValue)}
      <div
        className={classnames(styles.playerName, {
          [styles.playerMe]: me?.userId === player.userId,
        })}
      >
        <Typography variant='subtitle1'>{player.name}</Typography>
      </div>
    </div>
  );
}
