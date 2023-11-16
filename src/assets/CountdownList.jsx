import CountdownTimer from "./CountdownTimer";

export default function CountdownList({ list, onDelete, onRender }) {
  return (
    <div className="relative mx-auto w-full">
      {list.map((x) => (
        <CountdownTimer
          key={x.index}
          initialName={x.name}
          initialSeconds={x.seconds}
          id={x.index}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
