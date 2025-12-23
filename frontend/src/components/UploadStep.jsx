import { useState } from "react";
import API from "../services/api";

export default function UploadStep({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const upload = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("file", file);

      const res = await API.post("/upload", form);
      setInfo(res.data);
      onSuccess();
    } catch (err) {
      alert("Failed to upload file. Please upload a valid CSV or Excel file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Dataset Upload</h2>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />

      <button
        onClick={upload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Dataset"}
      </button>

      {info && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
          <p><strong>Rows:</strong> {info.rows}</p>
          <p><strong>Columns:</strong> {info.columns}</p>

          <p className="mt-2 font-semibold">Column Names:</p>
          <ul className="list-disc list-inside">
            {info.column_names.map((col) => (
              <li key={col}>{col}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
