import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    alphabets: false,
    numbers: false,
    highest_alphabet: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data.data)) {
        throw new Error("Invalid input: data must be an array");
      }

      const res = await axios.post("https://bajajdevtest.onrender.com", data);
      setResponse(res.data);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const filteredResponse = () => {
    if (!response) return null;

    const result = {};
    if (filters.alphabets) result.alphabets = response.alphabets;
    if (filters.numbers) result.numbers = response.numbers;
    if (filters.highest_alphabet) result.highest_alphabet = response.highest_alphabet;

    return Object.keys(result).length > 0 ? result : null;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Bajaj Finserv Health Dev Challenge</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"data": ["A", "1", "B", "2"]}'
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {response && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Filter Response:</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="alphabets"
                    checked={filters.alphabets}
                    onChange={(e) => setFilters((prev) => ({ ...prev, alphabets: e.target.checked }))}
                  />
                  <label htmlFor="alphabets">Alphabets</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="numbers"
                    checked={filters.numbers}
                    onChange={(e) => setFilters((prev) => ({ ...prev, numbers: e.target.checked }))}
                  />
                  <label htmlFor="numbers">Numbers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="highest_alphabet"
                    checked={filters.highest_alphabet}
                    onChange={(e) => setFilters((prev) => ({ ...prev, highest_alphabet: e.target.checked }))}
                  />
                  <label htmlFor="highest_alphabet">Highest Alphabet</label>
                </div>
              </div>
            </div>
          )}

          {filteredResponse() && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Filtered Response:</h2>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(filteredResponse(), null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
