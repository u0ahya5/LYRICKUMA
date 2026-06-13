import { useState } from "react";
import "./BookmarkCard.css";

function BookmarkCard({ title, date, thumbnail, onClick, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen((current) => !current);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className="bookmark-card"
      onClick={onClick}
    >
      <button
        type="button"
        className="bookmark-menu-button"
        onClick={handleMenuClick}
        aria-label="bookmark menu"
      >
        :
      </button>
      {isMenuOpen && (
        <button
          type="button"
          className="bookmark-delete-button"
          onClick={handleDeleteClick}
        >
          삭제
        </button>
      )}
      <div className="bookmark-info">
        <p className="bookmark-date">{date}</p>
        <p className="bookmark-title">{title}</p>
      </div>
      <img
        src={thumbnail}
        alt={title}
        className="bookmark-thumbnail"
      />
    </div>
  );
}

export default BookmarkCard;
