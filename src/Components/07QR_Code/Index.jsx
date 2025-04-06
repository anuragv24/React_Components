import { useRef, useState } from "react";
// import './styel.css'
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

export default function QRCodeGen() {
  const [state, setState] = useState("");
  const [input, setInput] = useState("");
  const qrRef = useRef(null);

  const handleState = () => {
    setState(input);
    setInput("");
    // alert("Generated")
  };
  const handleDownload = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png"; // set name of file that will be downloaded
        link.href = dataUrl;// link.href is the URL or data that will be downloaded when the link is clicked.
        link.click();
        //This simulates a user clicking the download link.Since it’s created programmatically, we manually trigger the click — this is what starts the download.
      })
      .catch((err) => {
        console.error("Error gerntering image", err);
      });
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>QR Code Generator</h1>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          name="qr-code"
          placeholder="Enter Your text or link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <button
          disabled={!input}
          onClick={handleState}
          style={{
            padding: "8px 12px",
            backgroundColor: input ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: input ? "pointer" : "not-allowed",
          }}
        >
          Generate
        </button>
      </div>
      {state && (
        <>
          <div
            ref={qrRef}
            style={{
              backgroundColor: "white",
              padding: "14px",
              borderRadius: "7px",
            }}
          >
            <QRCode id="qr-code" value={state} />
          </div>
          <button
            onClick={handleDownload}
            style={{
              marginTop: "20px",
              padding: "8px 12px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Download QR
          </button>
        </>
      )}
    </div>
  );
}
