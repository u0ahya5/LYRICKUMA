export default function StartButton({ children, className = "", onClick }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
