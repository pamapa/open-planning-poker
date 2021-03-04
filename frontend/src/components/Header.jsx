import React from "react";
import { useHistory } from "react-router-dom";

import openHack from "../imgs/open_hack_2019-03.svg";

import { Typography } from "@material-ui/core";

import Settings from "./Settings";

import styles from "./Header.module.css";

export default function Header({ name, setName, gameId }) {
  const history = useHistory();
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo} onClick={() => history.push("/")}>
        <img className={styles.logo} src={openHack} alt='Open Hack Logo' />
        <div>📅</div>
        <div>🃏</div>
      </div>
      <Typography variant='h5'>{gameId}</Typography>
      <Settings setName={setName} name={name} />
    </div>
  );
}
