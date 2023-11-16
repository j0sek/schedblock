import { useState, useEffect } from "react";
import CountdownTimer from "./assets/CountdownTimer";
import CountdownList from "./assets/CountdownList";
import AddItemButton from "./assets/AddItemButton";
import ItemInput from "./assets/ItemInput";

if (localStorage.getItem("list") === null) {
  localStorage.setItem("list", "[]");
}

function App() {
  let localList = JSON.parse(localStorage.getItem("list"));

  const [localItemList, setLocalItemList] = useState(localList);

  const [itemInputShown, setItemInputShown] = useState(false);

  function displayItemInput() {
    setItemInputShown(!itemInputShown);
  }

  // useEffect(() => {
  //   setLocalItemList(JSON.parse(localStorage.getItem("list")));
  // }, [itemInputShown]);

  function createItem(name, minutes, seconds) {
    let currentList = [...localItemList];

    let index = localStorage.getItem("index") || 1;

    let newTask = {
      name,
      seconds: Number(minutes) * 60 + Number(seconds),
      index,
    };

    currentList.push(newTask);

    let newIndex = Number(index) + 1;

    localStorage.setItem("index", newIndex);

    let updatedListString = JSON.stringify(currentList);

    setLocalItemList(currentList);
    localStorage.setItem("list", updatedListString);
    setItemInputShown(false);
  }

  function deleteItem(id) {
    setLocalItemList(localItemList.filter((x) => x.index !== id));

    localStorage.setItem(
      "list",
      JSON.stringify(localItemList.filter((x) => x.index !== id))
    );
  }

  // function deleteItem(id) {
  //   setLocalItemList((prevList) => {
  //     const updatedList = prevList.filter((x) => x.index !== id);

  //     // Update local storage with the updated list
  //     localStorage.setItem("list", JSON.stringify(updatedList));

  //     return updatedList;
  //   });
  // }

  return (
    <>
      <div className="min-w-fit relative w-96 mx-auto border">
        <CountdownList list={localItemList} onDelete={deleteItem} />
        <AddItemButton
          displayItemInput={() => {
            displayItemInput();
          }}
          text={itemInputShown ? "-" : "+"}
        />
        <ItemInput
          itemInputShown={itemInputShown}
          createFunc={createItem}
          cancelFunc={() => setItemInputShown(false)}
        />
      </div>
    </>
  );
}

export default App;
