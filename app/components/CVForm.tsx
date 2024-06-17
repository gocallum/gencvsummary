// app/components/CVForm.tsx
"use client";

import React, { useState } from 'react';

const CVForm: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://unnw2h2x8g.execute-api.ap-southeast-2.amazonaws.com/default/GenerateCVSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cv_text: cvText }),
      });

      const result = await response.json();
      setSummary(result);
    } catch (error) {
      console.error('Error generating summary:', error);
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
          <h3 className="font-bold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default CVForm;
