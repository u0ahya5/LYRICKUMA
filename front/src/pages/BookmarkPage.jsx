import { useState, useEffect } from "react";
import BookmarkCard from "../components/BookmarkCard";
import BrandLogo from "../components/BrandLogo";
import "./BookmarkPage.css";

export default function BookmarkPage({onHome, onSelectBookmark}) {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("lyrickuma_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lyrickuma_bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  function getYoutubeVideoId(url) {
    try {
      const parsedUrl = new URL(
        url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`
      );

      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
      }
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2];
      }

      return parsedUrl.searchParams.get("v");
    } catch {
      return null;
    }
  }

  function getThumbnail(url) {
    const videoId = getYoutubeVideoId(url);

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  function handleBookmarkClick(bookmark) {
    onSelectBookmark?.(bookmark);
  }

  const visibleBookmarks = isExpanded ? bookmarks : bookmarks.slice(0, 6);

  return (
    <div>
      <div className="header-container">
        <BrandLogo />
         
        <button
          className="home-button"
          onClick={onHome}
        >
          홈으로
        </button>
      </div>

      <div className="bookmark-container">
        {bookmarks.length === 0 ? (
          <p className="no-bookmarks" style={{ textAlign: "center", color: "#888", gridColumn: "1/-1", padding: "40px 0" }}>
            아직 저장된 구간 북마크가 없습니다. 메인 화면에서 구간을 저장해 보세요!
          </p>
        ) : (
          visibleBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              title={bookmark.title}
              date={bookmark.date}
              thumbnail={getThumbnail(bookmark.youtubeUrl)}
              onClick={() => handleBookmarkClick(bookmark)}
            />
          ))
        )}
      </div>

      {bookmarks.length > 6 && !isExpanded && (
        <div className="view-more-container">
          <button className="view-more-button" onClick={() => setIsExpanded(true)}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
}