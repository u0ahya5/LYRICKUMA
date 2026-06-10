import LinkIcon from "./LinkIcon";

export default function YoutubeLinkInput({
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <label className={`start-input-wrap ${className}`.trim()}>
      <LinkIcon />
      <input
        type="url"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
