import { useState } from "react";
import Main from "./pages/Main";
import Start from "./pages/Start";

export default function App() {
  const [loadedYoutubeUrl, setLoadedYoutubeUrl] = useState("");

  if (!loadedYoutubeUrl) {
    return <Start onLoad={setLoadedYoutubeUrl} />;
  }

  return <Main initialYoutubeUrl={loadedYoutubeUrl} />;
}
