// app/components/Card.tsx
import React from 'react';

const Card: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-6 mb-4 rounded-md w-full">
      <h2 className="text-lg font-bold mb-2 text-black">How This App Works</h2>
      <p className="mb-4 text-black">
        This application allows you to paste your CV text and uses an API to generate a summary
        using the <strong>Anthropic Claude-3 Sonnet</strong> model. This is a state-of-the-art large language model (LLM) designed for advanced natural language processing tasks. The API processes your CV and returns a brief summary of your experience.
      </p>
      <p className="mb-4 text-black">
        The Claude-3 Sonnet model, developed by Anthropic, excels in understanding and generating human-like text, making it ideal for summarizing complex documents like CVs. To learn more about this powerful model, visit the 
        <a href="https://www.anthropic.com/claude" className="text-blue-500 underline ml-1" target="_blank" rel="noopener noreferrer">official Claude-3 page</a>.
      </p>
    </div>
  );
};

export default Card;
