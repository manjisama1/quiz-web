// parseJSON.js
export function parseAndValidate(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) throw new Error('JSON must be an array');
    data.forEach((q, i) => {
      if (
        typeof q.question !== 'string' ||
        !Array.isArray(q.options) ||
        typeof q.answer !== 'number'
      ) {
        throw new Error(`Invalid question format at index ${i}`);
      }
    });
    return { valid: true, data };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
