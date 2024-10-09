import "./app.board.css";
import React from "react";
import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "app",
  Board: () => (
    <div className="AppBoard_div1">
      <div className="app">
        <div className="leftList">
          <div className="ButtonBar">
            <button className="AppBoard_button2">Button</button>
          </div>
        </div>
        <div className="centerList">
          <div className="ButtonBar">
            <button className="AppBoard_button2">Button</button>
          </div>
        </div>
      </div>
    </div>
  ),
  isSnippet: true,
  environmentProps: {
    windowWidth: 1165,
    windowHeight: 734,
  },
});
