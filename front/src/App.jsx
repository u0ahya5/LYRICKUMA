import { useState } from "react";
import Start from "./pages/Start";
import Main from "./pages/Main";
import BookmarkPage from "./pages/BookmarkPage";

export default function App() {
  const [page, setPage] = useState("start");
  const [loadedYoutubeUrl, setLoadedYoutubeUrl] = useState("");

  if (page === "start") {
    return (
      <Start
        onLoad={(url) => {
          setLoadedYoutubeUrl(url);
          setPage("main");
        }}
      />
    );
  }

  if (page === "bookmark") {
    return (
      <BookmarkPage
        onHome={() => setPage("main")}
      />
    );
  }

  return (
    <Main
      initialYoutubeUrl={loadedYoutubeUrl}
      onBookmark={() => setPage("bookmark")}
    />
  );
}