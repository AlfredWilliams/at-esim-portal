/**
 * Submits the registration form data, including files, to the backend API.
 *
 * Tailored for RegistrationPage:
 * - Handles idFront (file) and selfieWithId (file)
 * - Uses environment variable for API base URL
 * - Adds request timeout with AbortController
 * - Handles field-level validation errors
 * - Optional authentication header
 *
 * @param {import('../types').RegistrationFormData} formData - The registration form data object.
 * @returns {Promise<{success: boolean, message: string, data?: any}>}
 */
export const submitRegistration = async (formData) => {
  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/register`;

  console.log('Preparing to submit registration data:', formData);

  const submissionData = new FormData();

  // File validation for idFront
  if (formData.idFront) {
    if (formData.idFront.size > 5 * 1024 * 1024) {
      return { success: false, message: "ID front image too large (max 5MB)." };
    }
    if (!['image/jpeg', 'image/png'].includes(formData.idFront.type)) {
      return { success: false, message: "Invalid ID image type. Allowed: JPG, PNG." };
    }
  }

  // File validation for selfieWithId
  if (formData.selfieWithId) {
    if (formData.selfieWithId.size > 5 * 1024 * 1024) {
      return { success: false, message: "Selfie with ID too large (max 5MB)." };
    }
    if (!['image/jpeg', 'image/png'].includes(formData.selfieWithId.type)) {
      return { success: false, message: "Invalid selfie image type. Allowed: JPG, PNG." };
    }
  }

  // Append all fields
  for (const key in formData) {
    const value = formData[key];
    if (value !== null && value !== undefined) {
      submissionData.append(key, value);
    }
  }

  // Setup timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 seconds

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: submissionData,
      signal: controller.signal,
      headers: {
        // Optional authentication (if required by your backend)
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }),
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorBody = await response.json();

        if (errorBody.message) {
          errorMessage = errorBody.message;
        } else if (errorBody.errors) {
          // Combine field-level errors into a single string
          errorMessage = Object.values(errorBody.errors).flat().join(', ');
        } else {
          errorMessage = JSON.stringify(errorBody);
        }
      } catch {
        errorMessage = response.statusText;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();

    console.log('Server response:', result);

    return {
      success: true,
      message: result.message || 'Registration successful!',
      data: result,
    };

  } catch (error) {
    console.error('Registration API error:', error);

    return {
      success: false,
      message:
        error.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : error instanceof Error
          ? error.message
          : 'An unknown network error occurred.',
    };
  }
};
