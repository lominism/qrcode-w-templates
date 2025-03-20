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
  const [logoSize, setLogoSize] = useState(0.2); // Default logo size as a fraction of QR code size

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
      <div>
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
        </div>
        <div className="extra">
          <div className="color-controls">
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
          </div>
          <div className="size-controls">
            <h5>QR Code Size:</h5>
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
          <div className="upload-logo">
            <h5>Upload Logo:</h5>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>
          <div className="logo-size">
            <h5>Logo Size:</h5>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.01"
              value={logoSize}
              onChange={(e) => setLogoSize(Number(e.target.value))}
            />
          </div>
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
              width: size * logoSize, // Adjust logo size relative to QR code
              height: size * logoSize,
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
