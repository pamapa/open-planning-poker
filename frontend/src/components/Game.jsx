import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";

import { cards } from "../imgs/cards";

import {
  initiateSocket,
  disconnectSocket,
  setCard,
  showCards,
  resetCards,
  subscribeToStateUpdate,
} from "../utils/socketIo";

import { Typography, Button } from "@material-ui/core";

import Confetti from "./Confetti";
import Header from "./Header";
import Players from "./Players";
import Card from "./Card";

import styles from "./Game.module.css";

const getCardValues = (players) => {
  if (!players) {
    return null;
  }

  const numOr0 = (n) => (isNaN(n) || !n ? Infinity : n);

  // return list of all defined cards
  return players.filter(({ card }) => !!card).map(({ card }) => numOr0(card));
};

const Game = () => {
  const { gameId } = useParams();

  const [userId, setUserId] = useState(null);

  const [showValue, setShowValue] = useState(false);

  const [players, setPlayers] = useState([]);

  const [name, setName] = useState(window.localStorage.getItem("name") || null);

  const handleShowValue = () => {
    if (showValue) {
      resetCards();
    } else {
      showCards();
    }
  };

  const handleSelected = (cardName) => {
    setCard(cardName);
  };

  useEffect(() => {
    if (name && gameId) {
      initiateSocket(name, gameId, setUserId);

      subscribeToStateUpdate(setPlayers, setShowValue);

      return () => {
        disconnectSocket();
      };
    }
  }, [name, gameId]);

  const getSomeoneHasCard = () => players?.find((player) => !!player.card);
  const getMe = () => players?.find((player) => player.userId === userId);

  return (
    <div className={styles.gameContainer}>
      <Header name={name} setName={setName} gameId={gameId} />

      {showValue && <Confetti players={players} />}

      <Players players={players} />

      <div className={styles.selectionContainer}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleShowValue}
          disabled={!getSomeoneHasCard() && !showValue}
        >
          {showValue ? "Reset" : "Show"}
          {" cards"}
        </Button>

        <div className={styles.subtitle}>
          <Average />
        </div>

        <div className={styles.subtitle}>
          <Typography variant='subtitle1'>Select your Card</Typography>
        </div>

        <div
          className={classnames(styles.btnContainer, {
            [styles.btnsDisabled]: showValue,
          })}
        >
          {cards.map((cardName) => (
            <div
              key={cardName}
              className={classnames(styles.card, {
                [styles.selectedCard]: getMe()?.card === cardName,
              })}
              onClick={() => handleSelected(cardName)}
            >
              <Card cardName={cardName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
