import lyrickumaLogo from "../assets/logo/LYRICKUMA.png";
import mainLogo from "../assets/logo/main-logo.png";

export default function BrandLogo() {
  return (
    <div className="start-logo">
      <img className="start-logo__mark" src={mainLogo} alt="" />
      <img className="start-logo__text" src={lyrickumaLogo} alt="LYRICKUMA" />
    </div>
  );
}
