import { useState } from "react";
import CountdownTimer from "./assets/CountdownTimer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CountdownTimer initialName={"Walking the dog"} initialSeconds={30} />
    </>
  );
}

export default App;
