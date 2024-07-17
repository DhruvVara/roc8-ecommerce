export const jsonResponse = (response, status, success, message, data = []) => {
    // if (!Array.isArray(data)) {
    //   data = [data];
    // }
  
    return response.json({ success, message, data }, { status });
  };
  