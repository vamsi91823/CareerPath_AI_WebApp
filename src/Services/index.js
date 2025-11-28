import React, { useState } from "react";

function App() {
  const [result, setResult] = useState("");

  const callBackend = () => {
    fetch("http://localhost:5000/api/message")
      .then((response) => response.json())
      .then((data) => {
        setResult(data.message);
      })
      .catch((error) => {
        setResult("Error calling API");
      });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Frontend AJAX Call (React + fetch)</h2>

      <button onClick={callBackend}>
        Call Backend
      </button>

      <p>{result}</p>
    </div>
  );
}

export default App;
