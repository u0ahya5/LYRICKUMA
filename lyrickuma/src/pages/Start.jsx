import { useState } from "react";
import "./Start.css";
import BrandLogo from "../components/BrandLogo";
import StartActions from "../components/StartActions";
import YoutubeLinkInput from "../components/YoutubeLinkInput";

const YOUTUBE_PLACEHOLDER = "유튜브 링크를 입력하세요";
const LOAD_LABEL = "불러오기";
const BOOKMARK_LABEL = "구간 북마크";

export default function Start({ onLoad, onBookmark }) {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleLoad = () => {
    if (!youtubeUrl.trim()) {
      return;
    }

    onLoad(youtubeUrl.trim());
  };

  return (
    <main className="start-page">
      <section className="start-panel" aria-label="Lyrickuma start screen">
        <BrandLogo />
        <YoutubeLinkInput
          placeholder={YOUTUBE_PLACEHOLDER}
          value={youtubeUrl}
          onChange={(event) => setYoutubeUrl(event.target.value)}
        />
        <StartActions
          loadLabel={LOAD_LABEL}
          bookmarkLabel={BOOKMARK_LABEL}
          onLoad={handleLoad}
          onBookmark={onBookmark}
        />
      </section>
    </main>
  );
}
