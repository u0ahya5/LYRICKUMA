import StartButton from "./StartButton";

export default function StartActions({ loadLabel, bookmarkLabel }) {
  return (
    <div className="start-actions">
      <StartButton>{loadLabel}</StartButton>
      <StartButton>{bookmarkLabel}</StartButton>
    </div>
  );
}
