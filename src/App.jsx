import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("Example");
  const [size, setSize] = useState(250);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [logo, setLogo] = useState(null);

  // This updates the input word when the user clicks on the generate button
  function handleClick() {
    setWord(temp);
  }

  // Function to handle logo upload
  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  }

  // Function to download the QR code with the logo as a PNG
  function handleDownload() {
    const qrCodeContainer = document.getElementById("qr-code-container");
    if (!qrCodeContainer) {
      console.error("QR Code container not found!");
      return;
    }

    html2canvas(qrCodeContainer).then((canvas) => {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "QRCode_with_Logo.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
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
          <h5>Upload Logo:</h5>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>
      </div>
      <div
        id="qr-code-container"
        className="output-box"
        style={{
          position: "relative",
          display: "inline-block",
          width: size,
          height: size,
        }}
      >
        <QRCodeCanvas
          value={word}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
        />
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size * 0.2, // Adjust logo size relative to QR code
              height: size * 0.2,
              borderRadius: "50%", // Optional: make the logo circular
            }}
          />
        )}
      </div>
      <button type="button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}

export default App;
