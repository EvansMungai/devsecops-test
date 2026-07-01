export function extractErrorMessage(error: any): string {
  if (error?.error) {
    const err = error.error;

    // Case 1: Array of error objects with 'description'
    if (Array.isArray(err)) {
      return err
        .map((e: any) => e.description || e.message || JSON.stringify(e))
        .join(' ');
    }

    // Case 2: Single error object with 'message' or 'description'
    if (typeof err === 'object') {
      if (err.description) return err.description;
      if (err.message) return err.message;
    }

    // Case 3: Plain string error
    if (typeof err === 'string') {
      return err;
    }
  }

  // Fallback
  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}