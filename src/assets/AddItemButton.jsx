export default function AddItemButton({ displayItemInput, text }) {
  return (
    <div
      className="hover:cursor-pointer w-full border-2 text-center"
      onClick={() => displayItemInput()}
    >
      {text}
    </div>
  );
}
