import "./BookmarkCard.css";

function BookmarkCard({ title, date, thumbnail, onClick}) {
  return (
    <div
      className="bookmark-card"
      onClick={onClick}
    >
    <div className="bookmark-info">
        <p className="bookmark-date">{date}</p>
        <p className="bookmark-title">{title}</p>
    </div>
    <img
        src={thumbnail}
        alt={title}
        className="bookmark-thumbnail"/>
    </div>
  );
}

export default BookmarkCard;