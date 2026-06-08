import { useState } from "react";
import BrandLogo from "../components/BrandLogo";
import StartButton from "../components/StartButton";
import YoutubeLinkInput from "../components/YoutubeLinkInput";
import "./Main.css";

const SPEEDS = ["0.5x", "0.75x", "1.0x", "1.25x", "1.5x"];
const TOTAL_SECONDS = 163;

const YOUTUBE_PLACEHOLDER = "유튜브 링크를 입력하세요";
const LOAD_LABEL = "불러오기";
const BOOKMARK_LABEL = "구간 북마크";
const REPEAT_SECTION_LABEL = "반복 구간";
const SECTION_NAME_PLACEHOLDER = "구간 이름을 입력하세요";
const REPEAT_LABEL = "반복";
const SAVE_SECTION_LABEL = "구간 저장";
const SPEED_LABEL = "재생 속도";
const START_TIME_LABEL = "반복 시작 시간";
const END_TIME_LABEL = "반복 종료 시간";
const VIDEO_TITLE = "유튜브 영상";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
};

const parseTime = (value) => {
  const match = value.trim().match(/^(\d{1,2}):([0-5]\d)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]) * 60 + Number(match[2]);
};

function getYoutubeEmbedUrl(url) {
  const fallbackId = "dQw4w9WgXcQ";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
    }

    if (parsedUrl.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.split("/")[2]}`;
    }

    const videoId = parsedUrl.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId || fallbackId}`;
  } catch {
    return `https://www.youtube.com/embed/${fallbackId}`;
  }
}

export default function Main({ initialYoutubeUrl }) {
  const [youtubeUrl, setYoutubeUrl] = useState(initialYoutubeUrl);
  const [loadedVideoUrl, setLoadedVideoUrl] = useState(initialYoutubeUrl);
  const [sectionName, setSectionName] = useState("");
  const [repeatOn, setRepeatOn] = useState(true);
  const [speed, setSpeed] = useState("1.0x");
  const [sectionStart, setSectionStart] = useState(0);
  const [sectionEnd, setSectionEnd] = useState(0);
  const [sectionStartInput, setSectionStartInput] = useState("00:00");
  const [sectionEndInput, setSectionEndInput] = useState("00:00");

  const embedUrl = getYoutubeEmbedUrl(loadedVideoUrl);
  const sectionStartPercent = (sectionStart / TOTAL_SECONDS) * 100;
  const sectionEndPercent = (sectionEnd / TOTAL_SECONDS) * 100;

  const updateSectionStart = (nextStart) => {
    const clampedStart = Math.min(nextStart, sectionEnd, TOTAL_SECONDS);

    setSectionStart(clampedStart);
    setSectionStartInput(formatTime(clampedStart));
  };

  const updateSectionEnd = (nextEnd) => {
    const clampedEnd = Math.max(Math.min(nextEnd, TOTAL_SECONDS), sectionStart);

    setSectionEnd(clampedEnd);
    setSectionEndInput(formatTime(clampedEnd));
  };

  const handleStartInputChange = (event) => {
    const nextValue = event.target.value;
    const nextStart = parseTime(nextValue);

    setSectionStartInput(nextValue);

    if (nextStart === null) {
      return;
    }

    setSectionStart(Math.min(nextStart, sectionEnd, TOTAL_SECONDS));
  };

  const handleEndInputChange = (event) => {
    const nextValue = event.target.value;
    const nextEnd = parseTime(nextValue);

    setSectionEndInput(nextValue);

    if (nextEnd === null) {
      return;
    }

    setSectionEnd(Math.max(Math.min(nextEnd, TOTAL_SECONDS), sectionStart));
  };

  const handleStartRangeChange = (event) => {
    updateSectionStart(Number(event.target.value));
  };

  const handleEndRangeChange = (event) => {
    updateSectionEnd(Number(event.target.value));
  };

  const normalizeStartTime = () => {
    setSectionStartInput(formatTime(sectionStart));
  };

  const normalizeEndTime = () => {
    setSectionEndInput(formatTime(sectionEnd));
  };

  const handleLoadVideo = () => {
    if (!youtubeUrl.trim()) {
      return;
    }

    setLoadedVideoUrl(youtubeUrl.trim());
  };

  return (
    <main className="main-page">
      <header className="main-header">
        <BrandLogo />
        <div className="main-header__controls">
          <YoutubeLinkInput
            className="main-link-input"
            placeholder={YOUTUBE_PLACEHOLDER}
            value={youtubeUrl}
            onChange={(event) => setYoutubeUrl(event.target.value)}
          />
          <StartButton className="main-load-button" onClick={handleLoadVideo}>
            {LOAD_LABEL}
          </StartButton>
        </div>
        <StartButton className="main-bookmark-button">
          {BOOKMARK_LABEL}
        </StartButton>
      </header>

      <section className="player-card" aria-label="youtube player">
        <div className="video-wrap">
          <iframe
            title={VIDEO_TITLE}
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="control-panel" aria-label="repeat controls">
        <div className="repeat-control">
          <h2>{REPEAT_SECTION_LABEL}</h2>
          <div className="time-row">
            <input
              aria-label={START_TIME_LABEL}
              inputMode="numeric"
              value={sectionStartInput}
              onBlur={normalizeStartTime}
              onChange={handleStartInputChange}
            />
            <span>-</span>
            <input
              inputMode="numeric"
              aria-label={END_TIME_LABEL}
              value={sectionEndInput}
              onBlur={normalizeEndTime}
              onChange={handleEndInputChange}
            />
          </div>
          <div className="range-wrap">
            <input
              aria-label={START_TIME_LABEL}
              type="range"
              min="0"
              max={TOTAL_SECONDS}
              value={sectionStart}
              onChange={handleStartRangeChange}
              style={{ "--thumb-percent": `${sectionStartPercent}%` }}
            />
            <input
              aria-label={END_TIME_LABEL}
              type="range"
              min="0"
              max={TOTAL_SECONDS}
              value={sectionEnd}
              onChange={handleEndRangeChange}
              style={{ "--thumb-percent": `${sectionEndPercent}%` }}
            />
          </div>
          <div className="range-labels">
            <span>00:00</span>
            <span style={{ left: `${sectionStartPercent}%` }}>
              {formatTime(sectionStart)}
            </span>
            <span style={{ left: `${sectionEndPercent}%` }}>
              {formatTime(sectionEnd)}
            </span>
            <span>02:43</span>
          </div>
        </div>

        <div className="save-control">
          <input
            type="text"
            placeholder={SECTION_NAME_PLACEHOLDER}
            value={sectionName}
            onChange={(event) => setSectionName(event.target.value)}
          />
          <div className="save-actions">
            <StartButton
              className={repeatOn ? "utility-button is-active" : "utility-button"}
              onClick={() => setRepeatOn((current) => !current)}
            >
              {REPEAT_LABEL} {repeatOn ? "ON" : "OFF"}
            </StartButton>
            <StartButton className="utility-button">{SAVE_SECTION_LABEL}</StartButton>
          </div>
        </div>

        <div className="speed-control">
          <h2>{SPEED_LABEL}</h2>
          <div className="speed-list">
            {SPEEDS.map((option) => (
              <StartButton
                className={speed === option ? "speed-button is-active" : "speed-button"}
                key={option}
                onClick={() => setSpeed(option)}
              >
                {option}
              </StartButton>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
