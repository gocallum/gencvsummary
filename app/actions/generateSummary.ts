import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { TextDecoder as UtilTextDecoder } from 'util';

const TextDecoder = typeof window !== "undefined" && window.TextDecoder ? window.TextDecoder : UtilTextDecoder;

export async function generateSummary(cvText: string): Promise<string> {
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials or region are not defined');
  }

  const client = new BedrockRuntimeClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const systemPrompt = "Generate a summary based on the CV below in JSON format. The JSON should have a field 'summary' containing the summary text. Format: { \"summary\": \"{years of experience} as a {Role} with {list of companies worked at} followed by a brief list of projects or types of projects, and in just 1 sentence. based on the following CV: \" }";

  const requestBody = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `${systemPrompt}${cvText}`
          }
        ]
      }
    ],
    system: systemPrompt,
    top_k: 250,
    top_p: 0.999,
    stop_sequences: ['\n\nHuman:']
  };

  try {
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(requestBody),
    });

    const response = await client.send(command);
    const responseBody = new TextDecoder('utf-8').decode(response.body);
    
    // Log the entire response body for debugging
    console.log("Response Body:", responseBody);

    const result = JSON.parse(responseBody);

    console.log("Parsed Response Body:", result);

    // Check and log the content of the response
    if (result && result.content) {
      console.log("Content:", result.content);
    } else {
      console.log("No content found in the response");
    }

    if (!result || !result.content || !result.content[0] || result.content[0].type !== 'text') {
      throw new Error("Unexpected response format");
    }

    const summary = result.content[0].text || 'No summary generated';
    return summary;
  } catch (err: unknown) {
    const error = err as Error;
    let errorMessage = 'Failed to generate summary. ';
    if (error.message) {
      errorMessage += `Error message: ${error.message}. `;
    }
    if ('metadata' in error) {
      const metadata = (error as any).metadata;
      errorMessage += `Request ID: ${metadata.requestId}. `;
      errorMessage += `HTTP Status Code: ${metadata.httpStatusCode}. `;
    }
    if ('code' in error) {
      errorMessage += `Error Code: ${(error as any).code}. `;
    }

    console.error('Error generating summary:', error);
    throw new Error(errorMessage);
  }
}
