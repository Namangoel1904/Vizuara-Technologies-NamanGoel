import API from "../services/api";

export default function ModelStep({ onSuccess }) {
  const train = async (model) => {
    const res = await API.post(`/train?model=${model}`);
    onSuccess(res.data);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Model Selection</h2>

      <button
        onClick={() => train("logistic")}
        className="bg-indigo-600 text-white px-4 py-2 mr-4 rounded"
      >
        Logistic Regression
      </button>

      <button
        onClick={() => train("tree")}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Decision Tree
      </button>
    </>
  );
}
