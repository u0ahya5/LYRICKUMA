import StartButton from "./StartButton";

export default function StartActions({ loadLabel, bookmarkLabel, onLoad, onBookmark }) {
  return (
    <div className="start-actions">
      <StartButton onClick={onLoad}>{loadLabel}</StartButton>
      <StartButton onClick={onBookmark}>{bookmarkLabel}</StartButton>
    </div>
  );
}
