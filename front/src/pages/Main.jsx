import { useEffect, useRef, useState } from "react";
import BrandLogo from "../components/BrandLogo";
import StartButton from "../components/StartButton";
import YoutubeLinkInput from "../components/YoutubeLinkInput";
import "./Main.css";

const SPEEDS = ["0.5x", "0.75x", "1.0x", "1.25x", "1.5x"];
const YOUTUBE_PLACEHOLDER =
  "\uc720\ud29c\ube0c \ub9c1\ud06c\ub97c \uc785\ub825\ud558\uc138\uc694";
const LOAD_LABEL = "\ubd88\ub7ec\uc624\uae30";
const BOOKMARK_LABEL = "\uad6c\uac04 \ubd81\ub9c8\ud06c";
const REPEAT_SECTION_LABEL = "\ubc18\ubcf5 \uad6c\uac04";
const SECTION_NAME_PLACEHOLDER =
  "\uad6c\uac04 \uc774\ub984\uc744 \uc785\ub825\ud558\uc138\uc694";
const REPEAT_LABEL = "\ubc18\ubcf5";
const SAVE_SECTION_LABEL = "\uad6c\uac04 \uc800\uc7a5";
const SPEED_LABEL = "\uc7ac\uc0dd \uc18d\ub3c4";
const START_TIME_LABEL = "\ubc18\ubcf5 \uc2dc\uc791 \uc2dc\uac04";
const END_TIME_LABEL = "\ubc18\ubcf5 \uc885\ub8cc \uc2dc\uac04";
const VIDEO_TITLE = "\uc720\ud29c\ube0c \uc601\uc0c1";

const formatTime = (seconds) => {
  const normalizedSeconds = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(normalizedSeconds / 60)).padStart(2, "0");
  const rest = String(normalizedSeconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
};

const parseTime = (value) => {
  const match = value.trim().match(/^(\d+):([0-5]\d)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]) * 60 + Number(match[2]);
};

let youtubeApiPromise;

function loadYoutubeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve) => {
      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        resolve(window.YT);
      };

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    });
  }

  return youtubeApiPromise;
}

function getYoutubeVideoId(url) {
  try {
    const parsedUrl = new URL(
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`,
    );

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId || "";
    }

    if (parsedUrl.pathname.startsWith("/shorts/")) {
      const videoId = parsedUrl.pathname.split("/")[2];
      return videoId || "";
    }

    return parsedUrl.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

export default function Main({ initialYoutubeUrl }) {
  const playerElementRef = useRef(null);
  const playerRef = useRef(null);
  const [youtubeUrl, setYoutubeUrl] = useState(initialYoutubeUrl);
  const [loadedVideoUrl, setLoadedVideoUrl] = useState(initialYoutubeUrl);
  const [sectionName, setSectionName] = useState("");
  const [repeatOn, setRepeatOn] = useState(false);
  const [speed, setSpeed] = useState("");
  const [sectionStart, setSectionStart] = useState(0);
  const [sectionEnd, setSectionEnd] = useState(0);
  const [sectionStartInput, setSectionStartInput] = useState("00:00");
  const [sectionEndInput, setSectionEndInput] = useState("00:00");
  const [videoDuration, setVideoDuration] = useState(0);

  const videoId = getYoutubeVideoId(loadedVideoUrl);
  const totalSeconds = Math.max(videoDuration, 1);
  const sectionStartPercent = (sectionStart / totalSeconds) * 100;
  const sectionEndPercent = (sectionEnd / totalSeconds) * 100;

  useEffect(() => {
    if (!videoId || !playerElementRef.current) {
      setVideoDuration(0);
      return undefined;
    }

    let isActive = true;

    setVideoDuration(0);
    setSectionStart(0);
    setSectionEnd(0);
    setSectionStartInput("00:00");
    setSectionEndInput("00:00");

    loadYoutubeApi().then((YT) => {
      if (!isActive || !playerElementRef.current) {
        return;
      }

      playerRef.current?.destroy?.();
      playerRef.current = new YT.Player(playerElementRef.current, {
        videoId,
        playerVars: {
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            const duration = Math.floor(event.target.getDuration());

            if (isActive && duration > 0) {
              setVideoDuration(duration);
            }
          },
        },
      });
    });

    return () => {
      isActive = false;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId]);

  const updateSectionStart = (nextStart) => {
    const clampedStart = Math.min(nextStart, sectionEnd, totalSeconds);

    setSectionStart(clampedStart);
    setSectionStartInput(formatTime(clampedStart));
  };

  const updateSectionEnd = (nextEnd) => {
    const clampedEnd = Math.max(Math.min(nextEnd, totalSeconds), sectionStart);

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

    setSectionStart(Math.min(nextStart, sectionEnd, totalSeconds));
  };

  const handleEndInputChange = (event) => {
    const nextValue = event.target.value;
    const nextEnd = parseTime(nextValue);

    setSectionEndInput(nextValue);

    if (nextEnd === null) {
      return;
    }

    setSectionEnd(Math.max(Math.min(nextEnd, totalSeconds), sectionStart));
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
          {videoId ? (
            <div
              ref={playerElementRef}
              title={VIDEO_TITLE}
              className="youtube-player"
            />
          ) : (
            <p className="video-placeholder">{YOUTUBE_PLACEHOLDER}</p>
          )}
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
          <StartButton
            className={repeatOn ? "utility-button repeat-toggle is-active" : "utility-button repeat-toggle"}
            onClick={() => setRepeatOn((current) => !current)}
          >
            {REPEAT_LABEL} {repeatOn ? "ON" : "OFF"}
          </StartButton>
          <div className="range-wrap">
            <input
              aria-label={START_TIME_LABEL}
              type="range"
              min="0"
              max={totalSeconds}
              value={sectionStart}
              onChange={(event) => updateSectionStart(Number(event.target.value))}
            />
            <input
              aria-label={END_TIME_LABEL}
              type="range"
              min="0"
              max={totalSeconds}
              value={sectionEnd}
              onChange={(event) => updateSectionEnd(Number(event.target.value))}
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
            <span>{formatTime(videoDuration)}</span>
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

        <div className="save-control">
          <input
            type="text"
            placeholder={SECTION_NAME_PLACEHOLDER}
            value={sectionName}
            onChange={(event) => setSectionName(event.target.value)}
          />
          <div className="save-actions">
            <StartButton className="utility-button">{SAVE_SECTION_LABEL}</StartButton>
          </div>
        </div>
      </section>
    </main>
  );
}
