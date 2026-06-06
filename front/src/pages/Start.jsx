import "./Start.css";
import BrandLogo from "../components/BrandLogo";
import StartActions from "../components/StartActions";
import YoutubeLinkInput from "../components/YoutubeLinkInput";

const COPY = {
  placeholder: "\uc720\ud29c\ube0c \ub9c1\ud06c\ub97c \uc785\ub825\ud558\uc138\uc694",
  load: "\ubd88\ub7ec\uc624\uae30",
  bookmark: "\uad6c\uac04 \ubd81\ub9c8\ud06c",
};

export default function Start() {
  return (
    <main className="start-page">
      <section className="start-panel" aria-label="Lyrickuma start screen">
        <BrandLogo />
        <YoutubeLinkInput placeholder={COPY.placeholder} />
        <StartActions loadLabel={COPY.load} bookmarkLabel={COPY.bookmark} />
      </section>
    </main>
  );
}
