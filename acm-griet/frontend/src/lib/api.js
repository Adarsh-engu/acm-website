const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const submitApplication = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 422 && responseData.details) {
      throw new Error(responseData.details[0].message);
    }
    throw new Error(responseData.error || 'Failed to submit application');
  }

  return responseData;
};
