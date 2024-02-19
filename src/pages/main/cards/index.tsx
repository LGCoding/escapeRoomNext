"use client";
import { useCallback, useState } from "react";
import Card from "../../../components/main/cards/card";

export default function Cards() {
  const [width, setWidth] = useState<null | number>(null);
  const div = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  return (
    <div style={{ width: "100%", height: "100%" }} ref={div}>
      <h2 className="fw-bold text-uppercase mb-2 text-center ">Cards</h2>
      <Card
        parentWidth={width ?? 0}
        title="Fart 5"
        image={{
          x: 1,
          y: 1,
          width: 4,
          href: "/images/logo.png",
        }}
        texts={[
          { fontSize: 1, x: 0, y: 0, text: "this is a test" },
          { fontSize: 1, x: 0, y: 2, text: "this is a test" },
        ]}
      ></Card>
      <Card
        parentWidth={width ?? 0}
        title="Test"
        texts={[{ fontSize: 1, x: 0, y: 0, text: "this is a test" }]}
      ></Card>
      <Card
        parentWidth={width ?? 0}
        title="Test"
        texts={[{ fontSize: 1, x: 0, y: 0, text: "this is a test" }]}
      ></Card>
      <Card
        parentWidth={width ?? 0}
        title="Test"
        texts={[{ fontSize: 1, x: 0, y: 0, text: "this is a test" }]}
      ></Card>
      <Card
        parentWidth={width ?? 0}
        title="Test"
        texts={[{ fontSize: 1, x: 0, y: 0, text: "this is a test" }]}
      ></Card>
      <Card
        parentWidth={width ?? 0}
        title="Test"
        texts={[{ fontSize: 1, x: 0, y: 0, text: "this is a test" }]}
      ></Card>
    </div>
  );
}
