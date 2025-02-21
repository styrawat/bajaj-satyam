'use client';

import { useState } from 'react';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      console.log('Input JSON:', jsonInput);
      const parsedInput = JSON.parse(jsonInput);

      const res = await fetch('/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      const data = await res.json();
      console.log('Response:', data);
      setResponse(data);
      setError('');
    } catch (err) {
      console.error('Error parsing JSON:', err);
      setError('Invalid JSON');
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">BFHL Challenge</h1>
      <textarea
        className="w-full p-2 border rounded bg-gray-500 text-white"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Response:</h2>
          <div className="mt-2">
            {['Numbers', 'Alphabets', 'Highest Alphabet'].map((label) => (
              <label key={label} className="block">
                <input
                  type="checkbox"
                  value={label}
                  checked={selectedOptions.includes(label)}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
          <div className="mt-4">
            {selectedOptions.includes('Numbers') && response.numbers && (
              <div>
                <h3 className="font-semibold">Numbers:</h3>
                <p>{response.numbers.join(', ')}</p>
              </div>
            )}
            {selectedOptions.includes('Alphabets') && response.alphabets && (
              <div>
                <h3 className="font-semibold">Alphabets:</h3>
                <p>{response.alphabets.join(', ')}</p>
              </div>
            )}
            {selectedOptions.includes('Highest Alphabet') && response.highest_alphabet && (
              <div>
                <h3 className="font-semibold">Highest Alphabet:</h3>
                <p>{response.highest_alphabet.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}