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
  const [logoOpacity, setLogoOpacity] = useState(1); // Default logo opacity (fully visible)

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
          <div className="logo-opacity">
            <h5>Logo Opacity:</h5>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={logoOpacity}
              onChange={(e) => setLogoOpacity(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div
        id="qr-code-container"
        className="output-box"
        style={{
          position: "relative",
          display: "flex", // Use flexbox for vertical stacking
          flexDirection: "column", // Stack children vertically
          alignItems: "center", // Center children horizontally
          textAlign: "center", // Center text
          padding: "20px", // Optional: add padding around the QR code
          border: "2px solid #000", // Optional: add a border around the container
          borderRadius: "10px", // Optional: rounded corners
          backgroundColor: fgColor, // Set background color to match fgColor
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: size + 20, // Add padding for the border
            height: size + 20,
            backgroundColor: bgColor, // Background color for the QR code area
            border: "4px solid #000", // Border around the QR code
            borderRadius: "8px", // Optional: rounded corners for the QR code border
            padding: "10px", // Space between the QR code and the border
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
                opacity: logoOpacity, // Adjust logo opacity dynamically
              }}
            />
          )}
        </div>
        <p
          style={{
            marginTop: "1px", // Add spacing between the QR code and text
            fontSize: "30px",
            fontWeight: "bold",
            color: "#333",
            border: "2px solid #000", // Add a border around the text
            borderRadius: "8px", // Optional: rounded corners for the border
            padding: "5px 10px", // Add padding inside the border
            backgroundColor: "#fff", // Optional: background color for contrast
          }}
        >
          SCAN ME
        </p>
      </div>
      <button type="button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}

export default App;
