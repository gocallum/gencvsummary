# CV Summary App

This project is a web application that allows users to paste their CV text and generate a summary using an advanced natural language processing model. The application is built with modern web technologies and leverages cloud services to provide a seamless and efficient user experience.

## Table of Contents
- [Background](#background)
- [Summary](#summary)
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Background

The CV Summary App was developed to simplify the process of summarizing long CVs or resumes. It uses a large language model (LLM) to provide concise summaries that highlight the key aspects of a user's professional experience. This tool is especially useful for recruiters and HR professionals who need to quickly assess a candidate's qualifications.

## Summary

This application allows users to input their CV text and, with the click of a button, generate a summarized version. The summary is generated using the Claude-3 Sonnet model from Anthropic, a state-of-the-art LLM known for its ability to understand and generate human-like text. The app is built with Next.js for the frontend and integrates with AWS services like Lambda and API Gateway to handle backend logic and API calls.

## Technologies

### Frontend
- **Next.js**: A React framework that provides server-side rendering and static site generation, ensuring fast performance and a great user experience.
- **TypeScript**: Provides static typing, enhancing code quality and developer productivity.
- **Tailwind CSS**: A utility-first CSS framework for creating responsive and modern user interfaces.

### Backend
- **AWS Lambda**: A serverless compute service that runs your code in response to events and automatically manages the underlying compute resources.
- **AWS API Gateway**: A managed service that allows developers to create, publish, maintain, monitor, and secure APIs at any scale.
- **AWS Bedrock**: A fully managed service that provides easy access to advanced LLMs like Claude-3 Sonnet for various text generation and processing tasks.

## Features

- **CV Text Input**: Users can paste their CV text into a textarea for processing.
- **Generate Summary**: On clicking the "Generate Summary" button, the app calls an API to summarize the CV.
- **Display Summary**: The generated summary is displayed on the same page for easy access.
- **Responsive Design**: The app is designed to work on both desktop and mobile devices.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **AWS Account**: You will need an AWS account to configure and deploy the backend services.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cv-summary-app.git
   cd cv-summary-app

# Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open your browser:
Navigate to http://localhost:3000 to see the app in action.

Configuration
API Endpoint
To configure the API endpoint dynamically instead of hard-coding it into the application, follow these steps:

Create a configuration file: Create a .env.local file in the root directory of your project.

Add the API endpoint to the configuration file:

`` bash

NEXT_PUBLIC_API_ENDPOINT=https://unnw2h2x8g.execute-api.ap-southeast-2.amazonaws.com/default/GenerateCVSummary
Modify the API call in your CVForm component:
`` 

``
const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch(apiEndpoint, {
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
``

Ensure .env.local is added to .gitignore to prevent it from being committed to version control:

``
echo .env.local >> .gitignore
``




# Backend
Deploy Lambda function: Package your Lambda function and deploy it using the AWS CLI or AWS Console.
Configure API Gateway: Create or update your API Gateway to point to your Lambda function.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

# License
This project is licensed under the MIT License. See the LICENSE file for more information.