import { useState } from "react";
import API from "../services/api";

export default function SplitStep({ onSuccess }) {
  const [ratio, setRatio] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const [splitInfo, setSplitInfo] = useState(null);

  const split = async () => {
    try {
      setLoading(true);
      const res = await API.post(`/split?ratio=${ratio}`);
      setSplitInfo(res.data);
      onSuccess();
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "object") {
        alert(
          `${detail.error}\n\nWhy:\n${detail.why}\n\nHow to fix:\n- ${detail.how_to_fix.join("\n- ")}`
        );
      } else {
        alert("Train-test split failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Train–Test Split</h2>

      <label className="block mb-2 text-sm">
        Select Split Ratio
      </label>

      <select
        value={ratio}
        onChange={(e) => setRatio(Number(e.target.value))}
        className="border p-2 mb-3"
      >
        <option value={0.7}>70% Train / 30% Test</option>
        <option value={0.8}>80% Train / 20% Test</option>
      </select>

      <br />

      <button
        onClick={split}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Splitting..." : "Split Dataset"}
      </button>

      {splitInfo && (
        <div className="mt-4 p-4 bg-green-100 rounded text-sm">
          <p><strong>Status:</strong> {splitInfo.status}</p>
          <p>Training samples: {splitInfo.train_samples}</p>
          <p>Testing samples: {splitInfo.test_samples}</p>
        </div>
      )}
    </>
  );
}
