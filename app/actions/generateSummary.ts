import { revalidatePath } from 'next/cache';
import 'server-only';

export async function generateSummary(cvText: string): Promise<string> {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  if (!apiEndpoint) {
    throw new Error('API endpoint is not defined in environment variables');
  }

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cv_text: cvText }),
    });

    if (!response.ok) {
      throw new Error(`Error generating summary: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message || 'Summary generated successfully.';
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error generating summary:', error);
      throw new Error(error.message || 'Failed to generate summary');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
