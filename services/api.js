/**
 * In a real application, this file would contain functions to interact with your backend API endpoints.
 * For example, fetching data, submitting forms, etc.
 */

/**
 * Submits the registration form data, including files, to the backend API.
 * This function uses the FormData API to correctly handle multipart/form-data submissions,
 * which is essential for file uploads.
 *
 * @param {import('../types').RegistrationFormData} formData - The registration form data object from the component's state.
 * @returns {Promise<{success: boolean, message: string, data?: any}>} A promise that resolves with the submission result.
 * 'success' will be true if the API call was successful (e.g., HTTP 200-299), and false otherwise.
 * 'message' will contain a user-friendly message from the server or a generic error message.
 * 'data' will contain the response body from the server on success.
 */
export const submitRegistration = async (formData) => {
  // The API endpoint where the registration data will be sent.
  // This should be replaced with your actual backend endpoint.
  const API_ENDPOINT = '/api/register'; // Example: 'https://your-backend.com/api/register'

  console.log('Preparing to submit registration data:', formData);

  // FormData is used to construct a set of key/value pairs representing form fields and their values,
  // which can then be sent using fetch(). It's ideal for sending files.
  const submissionData = new FormData();

  // Dynamically append all form fields from the state to the FormData object.
  // This makes the code maintainable, as new fields in the form will be added automatically.
  for (const key in formData) {
    const value = formData[key];
    // Ensure we don't append null or undefined values.
    if (value !== null && value !== undefined) {
      submissionData.append(key, value);
    }
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: submissionData,
      // IMPORTANT: Do NOT set the 'Content-Type' header manually when using FormData.
      // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
      // If you had an auth token, you would add it here, e.g.:
      // headers: {
      //   'Authorization': `Bearer YOUR_API_TOKEN`
      // }
    });

    // The .ok property of the Response interface contains a boolean stating
    // whether the response was successful (status in the range 200-299) or not.
    if (!response.ok) {
      // If the server returns an error (e.g., 400, 422, 500),
      // we attempt to parse the error message from the response body.
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorBody = await response.json();
        // Use the server's error message if available.
        errorMessage = errorBody.message || JSON.stringify(errorBody);
      } catch (e) {
        // If the error body isn't valid JSON, use the status text.
        errorMessage = response.statusText;
      }
      // Throwing an error here will be caught by the catch block below.
      throw new Error(errorMessage);
    }

    // If the response is successful, parse the JSON body.
    const result = await response.json();

    console.log('Server response:', result);
    
    // Return a standardized success object.
    return {
      success: true,
      message: result.message || 'Registration successful!',
      data: result,
    };

  } catch (error) {
    // This will catch network errors (e.g., user is offline) or the error thrown above.
    console.error('Registration API error:', error);

    // Return a standardized error object.
    return {
      success: false,
      // Ensure we're passing a string message.
      message: error instanceof Error ? error.message : 'An unknown network error occurred.',
    };
  }
};