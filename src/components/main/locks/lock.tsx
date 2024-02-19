"use client";
import React, { useState } from "react";
import { LockFill, UnlockFill } from "react-bootstrap-icons";
import styles from "./lock.module.css";

interface CardProps {
  title: string;
  combination: string;
  openCallback: () => void;
}

const characters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Locks({ title, combination, openCallback }: CardProps) {
  const [currentComboIndex, setCurrentComboIndex] = useState([0, 0, 0, 0]);
  const [open, setOpen] = useState(false);
  const changeCurrentCombo = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    let c = currentComboIndex[index] ?? 0;
    if (
      (e.clientY - e.currentTarget.getBoundingClientRect().top) /
        e.currentTarget.getBoundingClientRect().height <
      0.5
    ) {
      if (c + 1 === characters.length) c = 0;
      else c = c + 1;
    } else {
      if (c - 1 === -1) c = characters.length - 1;
      else c = c - 1;
    }
    setCurrentComboIndex(
      currentComboIndex.map((v, i) => {
        if (i === index) return c;
        else return v;
      }),
    );
  };
  return (
    <div className={"relative inline-block " + styles.lock}>
      {open ? (
        <UnlockFill
          style={{ position: "absolute", left: "1.2rem" }}
          className="absolute"
          size="10rem"
        />
      ) : (
        <LockFill className="absolute" size="10rem" />
      )}
      <div
        className={styles.shackle}
        onClick={() => {
          if (!open) {
            let allGood = true;
            for (let i = 0; i < 4; i++) {
              if (
                combination.charAt(i) !== characters[currentComboIndex[i] ?? 0]
              ) {
                allGood = false;
              }
            }
            if (allGood) {
              openCallback();
              setOpen(true);
            }
          }
        }}
      ></div>

      <div className={"text-light " + styles.title}>{title}</div>
      <div className={"text-light " + styles.lockNumbers}>
        <span
          onClick={(e) => {
            changeCurrentCombo(0, e);
          }}
          className={"bg-light text-primary " + styles.lockNumber}
        >
          {characters[currentComboIndex[0] ?? 0]}
        </span>
        <span
          onClick={(e) => {
            changeCurrentCombo(1, e);
          }}
          className={"bg-light text-primary " + styles.lockNumber}
        >
          {characters[currentComboIndex[1] ?? 0]}
        </span>
        <span
          onClick={(e) => {
            changeCurrentCombo(2, e);
          }}
          className={"bg-light text-primary " + styles.lockNumber}
        >
          {characters[currentComboIndex[2] ?? 0]}
        </span>
        <span
          onClick={(e) => {
            changeCurrentCombo(3, e);
          }}
          className={"bg-light text-primary " + styles.lockNumber}
        >
          {characters[currentComboIndex[3] ?? 0]}
        </span>
      </div>
    </div>
  );
}
