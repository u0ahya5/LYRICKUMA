import { useState } from "react";
import Start from "./pages/Start";
import Main from "./pages/Main";
import BookmarkPage from "./pages/BookmarkPage";

export default function App() {
  const [page, setPage] = useState("start");
  const [loadedYoutubeUrl, setLoadedYoutubeUrl] = useState("");
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  const handleSelectBookmark = (bookmark) => {
    setSelectedBookmark(bookmark);       // 북마크 데이터 저장
    setLoadedYoutubeUrl(bookmark.youtubeUrl); // 메인에 뜰 URL 동기화
    setPage("main");                     // 메인(홈) 페이지로 강제 이동!
  };

  if (page === "start") {
    return (
      <Start
        onLoad={(url) => {
          setLoadedYoutubeUrl(url);
          setPage("main");
        }}
        onBookmark={() => {
          setPage("bookmark");
        }}
      />
    );
  }

  if (page === "bookmark") {
    return (
      <BookmarkPage
        onHome={() => setPage("main")}
        onSelectBookmark={handleSelectBookmark}
      />
    );
  }

  return (
    <Main
      initialYoutubeUrl={loadedYoutubeUrl}
      onUrlChange={(url) => setLoadedYoutubeUrl(url)}
      onBookmark={() => setPage("bookmark")}
      selectedBookmark={selectedBookmark}
      setSelectedBookmark={setSelectedBookmark}
    />
  );
}