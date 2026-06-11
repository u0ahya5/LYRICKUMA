import BookmarkCard from "../components/BookmarkCard";
import BrandLogo from "../components/BrandLogo";
import "./BookmarkPage.css";

export default function BookmarkPage({onHome,}) {
  const bookmarks = [
    {
      id: 1,
      title: "처음 불러보는 노래",
      date: "2026.05.25",
      youtubeUrl: "https://youtu.be/3u_eF_Y8t_0?si=fF0mLm25QR-_EqTO",
      startTime: 42,
      endTime: 50,
      speed: 0.75,
      isLooping: true,
    },
    {
      id: 2,
      title: "130 메트로놈...",
      date: "2026.05.24",
      youtubeUrl: "https://youtu.be/fmE7WfLh-k4?si=aMeQ6OebfxeegALk",
      startTime: 60,
      endTime: 70,
      speed: 1,
      isLooping: false,
    },
  ];

  function getYoutubeVideoId(url) {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
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
    console.log("선택한 북마크");

    console.log(bookmark.title);
    console.log(bookmark.youtubeUrl);
    console.log(bookmark.startTime);
    console.log(bookmark.endTime);
    console.log(bookmark.speed);

  }

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
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            title={bookmark.title}
            date={bookmark.date}
            thumbnail={getThumbnail(bookmark.youtubeUrl)}
            onClick={() => handleBookmarkClick(bookmark)}
          />
        ))}
      </div>

      <div className="view-more-container">
        <button className="view-more-button">
          더보기
        </button>
      </div>
    </div>
  );
}