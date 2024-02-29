import React, { useState } from "react";
import "./App.css";
import { Button, Progress } from "@chakra-ui/react";

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }
    if (selectedFile.type !== "text/csv") {
      setError("Please select a CSV file.");
      return;
    }
    setError(null);
    setFile(selectedFile);

    // Read the contents of the CSV file
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n");
      const data = rows.map((row) => row.split(","));
      setCsvData(data);
    };
    reader.readAsText(selectedFile);
  };

  return (
    <>
      <main className="text-4xl text-white align-items text-center py-8">
        <h1>Upload a CSV File Here</h1>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="my-8"
        />
        <Button
          className="my-8"
          colorScheme="teal"
          size="lg"
          onClick={() => {
            if (!file) {
              setError("Please select a file.");
            } else {
              // You can perform file upload logic here if needed
              console.log("Uploaded file:", file);
            }
          }}
        >
          {error ? error : "Upload"}
        </Button>
        {csvData.length > 0 && (
          <div className="mt-4">
            <h2>CSV File Contents:</h2>
            <table className="text-lg">
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Progress size="xs" isIndeterminate />
      </main>
    </>
  );
}

export default App;
