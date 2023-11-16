import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../index.css";

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 15%;
  height: 30px;
`;

const CountdownTimer = ({ initialSeconds, initialName, id, onDelete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [name, setName] = useState(initialName);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, name]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const remainingSeconds = timeInSeconds % 60;

    return `${hours > 0 ? hours + "h " : ""}${
      minutes > 0 ? minutes + "m " : ""
    }${remainingSeconds}s`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setSeconds(seconds);
    setName(name);
  };

  const progressWidth =
    Math.min((initialSeconds - seconds) / initialSeconds, 1) * 200;

  return (
    <div id={id} className="flex items-center relative border w-fit">
      <div className="pr-2 w-52 text-center">
        {editing ? (
          <input
            className="w-52 bg-white border"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            min="1"
          />
        ) : (
          name
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className="absolute z-10">
          {editing ? (
            <input
              className="w-52 bg-white border"
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              min="1"
            />
          ) : (
            formatTime(seconds)
          )}
        </div>
        <div className="flex items-center w-52">
          <div
            style={{
              width: "200px",
              height: "20px",
              backgroundColor: "transparent",
              position: "absolute",
              border: "2px solid green",
              borderRadius: "7px",
              zIndex: -1,
              opacity: 0.7,
            }}
          ></div>
          <div
            style={{
              transition: "width 1s ease-out",
              width: `${progressWidth}px`,
              borderRadius: "7px",
              height: "20px",
              backgroundColor: "rgba(80, 210, 80, 0.5)",
              position: "absolute",
            }}
          ></div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleStart} disabled={isActive || editing}>
          Start
        </Button>
        <Button onClick={handleStop} disabled={!isActive || editing}>
          Stop
        </Button>
        <Button onClick={handleReset} disabled={editing}>
          Reset
        </Button>
        {editing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit} disabled={isActive}>
            Edit
          </Button>
        )}
        <Button
          onClick={() => {
            console.log("pressed");
            onDelete(id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
