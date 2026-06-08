import StartButton from "./StartButton";

export default function StartActions({ loadLabel, bookmarkLabel, onLoad }) {
  return (
    <div className="start-actions">
      <StartButton onClick={onLoad}>{loadLabel}</StartButton>
      <StartButton>{bookmarkLabel}</StartButton>
    </div>
  );
}
