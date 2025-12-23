import API from "../services/api";
import { useState } from "react";

export default function PreprocessStep({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const apply = async (method) => {
    try {
      setLoading(true);
      await API.post(`/preprocess?method=${method}`);
      onSuccess();
    } catch {
      alert("Preprocessing failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Preprocessing</h2>

      <button
        onClick={() => apply("standard")}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 mr-4 rounded disabled:opacity-50"
      >
        Standardization
      </button>

      <button
        onClick={() => apply("minmax")}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Normalization
      </button>
    </>
  );
}
