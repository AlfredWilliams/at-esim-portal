/**
 * In a real application, this file would contain functions to interact with your backend API endpoints.
 * For example, fetching data, submitting forms, etc.
 */

/**
 * Submits the registration form data to the backend.
 * @param {import('../types').RegistrationFormData} formData - The registration form data object.
 * @returns {Promise<{success: boolean, message: string}>} A promise that resolves with the submission result.
 */
export const submitRegistration = async (formData) => {
  console.log('Submitting registration data to the backend:', formData);

  // This is a placeholder for your actual API endpoint.
  const API_ENDPOINT = '/api/register';

  // In a real-world scenario, you would use FormData to handle file uploads.
  const submissionData = new FormData();

  // Append all form fields to the FormData object.
  for (const [key, value] of Object.entries(formData)) {
    if (value) { // Ensure we don't append null or empty values if not desired
        submissionData.append(key, value);
    }
  }
  
  /**
   * ================= REAL FETCH LOGIC (COMMENTED OUT) =================
   * In a live application, you would uncomment and use this block.
   */
  /*
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: submissionData,
      // You might need headers, for example, for an authorization token.
      // headers: {
      //   'Authorization': `Bearer ${YOUR_API_TOKEN}`
      // }
    });

    if (!response.ok) {
      // Handle HTTP errors like 404 or 500
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return { success: true, message: 'Registration successful!', data: result };

  } catch (error) {
    console.error('Registration API error:', error);
    // Ensure the error is propagated or handled gracefully
    return { success: false, message: error.message };
  }
  */

  /**
   * ================= SIMULATED FETCH LOGIC =================
   * We will simulate the network request with a Promise and setTimeout.
   */
  return new Promise((resolve) => {
    setTimeout(() => {
      // You can test the error case by providing 'error@example.com' as the email.
      if (formData.email !== 'error@example.com') { 
        console.log('Simulated API call successful.');
        resolve({
          success: true,
          message: 'Registration submitted successfully!',
        });
      } else {
        // Simulate a business logic error response from the server
        console.error('Simulated API call failed.');
        resolve({
          success: false,
          message: 'This email address is blocked by the server.',
        });
      }
    }, 3000); // 3-second delay to simulate network latency
  });
};
