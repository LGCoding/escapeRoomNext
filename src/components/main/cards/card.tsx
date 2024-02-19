"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import styles from "./cards.module.css";

interface CardProps {
  title: string;
  image?: {
    href: string;
    x: number;
    y: number;
    width: number;
    height?: number;
  };
  parentWidth: number;
  texts: { fontSize: number; x: number; y: number; text: string }[];
}

export default function Cards({ title, image, texts, parentWidth }: CardProps) {
  const [size, setSize] = useState("10rem");
  const [expanded, setExpanded] = useState(false);
  const card = useRef<HTMLDivElement | null>(null);
  const rem = parentWidth / 160;
  useEffect(() => {
    if (expanded) {
      card.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [expanded]);

  return (
    <Card
      className={styles.cardBase}
      style={{
        width: size,
        backgroundSize: size,
      }}
      onClick={(e) => {
        if (expanded) {
          setSize("10rem");
          setExpanded(false);
        } else {
          setSize("100%");
          setExpanded(true);
          e.currentTarget.scrollIntoView(false);
        }
      }}
    >
      <Card.Body
        ref={card}
        className={styles.cardBody}
        style={{
          padding: 0.25 * (expanded ? rem : 1) + "rem",
        }}
      >
        <h1
          style={{
            fontSize: 2 * (expanded ? rem : 1) + "rem",
            gridArea: "a",
            margin: 0,
          }}
          className="text-center"
        >
          {title}
        </h1>
        <div style={{ gridArea: "b", position: "relative" }}>
          {texts.map((object, i) => {
            return (
              <p
                style={{
                  left: object.x * (expanded ? rem : 1) + "rem",
                  top: object.y * (expanded ? rem : 1) + "rem",
                  position: "absolute",
                  fontSize: object.fontSize * (expanded ? rem : 1) + "rem",
                }}
                key={i + "cardText" + "title"}
              >
                {object.text}
              </p>
            );
          })}
          {image ? (
            <Image
              alt="image"
              src={image?.href ?? ""}
              style={{
                left: image.x * (expanded ? rem : 1) + "rem",
                top: image.y * (expanded ? rem : 1) + "rem",
                position: "absolute",
                width: image.width * (expanded ? rem : 1) + "rem",
                height: image.height
                  ? image.height * (expanded ? rem : 1) + "rem"
                  : "auto",
              }}
            />
          ) : (
            ""
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
