import React, { useEffect, useState } from "react";

const TOTAL_ROWS = 50000;
const ROW_HEIGHT = 40;
const VISIBLE_ROWS = 20;
const BUFFER = 5;

const data = Array.from({ length: TOTAL_ROWS }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
}));

export default function App() {
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    const firstRow = Math.floor(scrollTop / ROW_HEIGHT);

    setStartIndex(Math.max(0, firstRow - BUFFER));
  };

  const rows = [];

  const endIndex = Math.min(
    TOTAL_ROWS,
    startIndex + VISIBLE_ROWS + BUFFER * 2
  );

  for (let i = startIndex; i < endIndex; i++) {
    rows.push(
      <div
        key={data[i].id}
        style={{
          height: ROW_HEIGHT,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          padding: "0 10px",
          backgroundColor: "white",
        }}
      >
        <div style={{ width: "100px" }}>
          {data[i].id}
        </div>

        <div style={{ width: "200px" }}>
          {data[i].name}
        </div>

        <div>
          {data[i].email}
        </div>
      </div>
    );
  }

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: "600px",
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
    >
      {/* Keeps the scrollbar representing all 50,000 rows */}
      <div
        style={{
          height: TOTAL_ROWS * ROW_HEIGHT,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: startIndex * ROW_HEIGHT,
            left: 0,
            right: 0,
          }}
        >
          {rows}
        </div>
      </div>
    </div>
  );
}