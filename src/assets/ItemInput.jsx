import { useState } from "react";

const Input = ({ width, placeholder, value, onChange, type }) => {
  return (
    <input
      className={`h-8 enabled:border w-${width} text-center`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
    ></input>
  );
};

const Button = ({ text, onClick, bg }) => {
  return (
    <button className={`border w-1/2 block ${bg}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default function ItemInput({ itemInputShown, createFunc, cancelFunc }) {
  const [itemName, setItemName] = useState("");
  const [itemMinutes, setItemMinutes] = useState("");
  const [itemSeconds, setItemSeconds] = useState("");

  return (
    <div
      className={`${
        itemInputShown ? "block" : "hidden"
      } flex flex-col justify-center items-center border relative mx-auto w-max`}
    >
      <div className="flex border-indigo-600 border">
        <Input
          width="64"
          placeholder="Task Name"
          value={itemName}
          onChange={(val) => setItemName(val)}
          type={"text"}
        />
      </div>
      <div className="flex w-64 justify-center">
        <Input
          width="1/2"
          placeholder="Minutes"
          value={itemMinutes}
          onChange={(val) => setItemMinutes(val)}
          type={"number"}
        />
        <Input
          width="1/2"
          placeholder="Seconds"
          value={itemSeconds}
          onChange={(val) => setItemSeconds(val)}
          type={"number"}
        />
      </div>
      <div className="flex justify-around border-indigo-600 border w-full">
        <Button
          text="Create"
          onClick={() => {
            createFunc(itemName, itemMinutes, itemSeconds);
            setItemName("");
            setItemMinutes("");
            setItemSeconds("");
          }}
          bg="bg-lime-400"
        />
        <Button
          text="Cancel"
          onClick={() => {
            cancelFunc();
            setItemName("");
            setItemMinutes("");
            setItemSeconds("");
          }}
          bg="bg-orange-400"
        />
      </div>
    </div>
  );
}
