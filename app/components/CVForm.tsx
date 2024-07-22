// app/components/CVForm.tsx
"use client";

import React, { useState } from 'react';
import { generateSummary } from '../actions/generateSummary'; // Adjust path as necessary

const CVForm: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(''); // Clear previous errors
      const response = await generateSummary(cvText);
      const jsonResponse = JSON.parse(response);
      
      if (jsonResponse && jsonResponse.summary) {
        setSummary(jsonResponse.summary);
      } else {
        throw new Error("Summary field not found in response.");
      }
    } catch (error: unknown) {
      console.error('Error generating summary:', error);
      const errorMessage = error instanceof Error
        ? `Failed to generate summary. Please check your AWS configuration and try again. Error: ${error.message}`
        : 'Failed to generate summary. An unknown error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 mb-4 rounded-md w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          placeholder="Paste your CV text here..."
          className="w-full h-48 p-2 mb-4 border border-gray-300 rounded-md resize-none"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Generate Summary
        </button>
      </form>
      {summary && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="font-bold text-black">Summary:</h3>
          <textarea
            readOnly
            value={summary}
            className="w-full h-48 p-2 border border-gray-300 rounded-md resize-none"
          ></textarea>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md">
          <h3 className="font-bold text-red-600">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CVForm;
