import LinkIcon from "./LinkIcon";

export default function YoutubeLinkInput({ placeholder }) {
  return (
    <label className="start-input-wrap">
      <LinkIcon />
      <input type="url" placeholder={placeholder} />
    </label>
  );
}
