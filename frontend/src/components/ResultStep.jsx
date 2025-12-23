export default function ResultStep({ result }) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-4">Model Output & Results</h2>
  
        <div className="mb-4 p-4 bg-green-100 rounded">
          <p><strong>Execution Status:</strong> {result.status}</p>
          <p><strong>Model Used:</strong> {result.model}</p>
          <p><strong>Accuracy:</strong> {result.accuracy}</p>
        </div>
  
        <div>
          <p className="font-semibold mb-2">Confusion Matrix</p>
          <img
            src={`data:image/png;base64,${result.visualization.image}`}
            alt="Confusion Matrix"
            className="border rounded"
          />
        </div>
      </>
    );
  }
  