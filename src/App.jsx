import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("Example");
  const [size, setSize] = useState(250);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");

  // This updates the input word when the user clicks on the generate button
  function handleClick() {
    setWord(temp);
  }

  // Function to download the QR code as a PNG
  function handleDownload() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="App">
      <h1>The Lombomb QR Code Generator</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            onChange={(e) => {
              setTemp(e.target.value);
            }}
            placeholder="Enter URL to encode"
          />
          <button className="button" onClick={handleClick}>
            Generate
          </button>
        </div>
        <div className="extra">
          <h5>Background Color:</h5>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
            }}
          />
          <h5>Foreground Color:</h5>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => {
              setFgColor(e.target.value);
            }}
          />
          <h5>Dimension:</h5>
          <input
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="output-box">
        <QRCodeCanvas
          value={word}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
        />
        <button type="button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
