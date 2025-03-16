const responseHandler = (res, status, success, message, data = null) => {
  const response = { success, message };
  if (data) response.data = data;

  console.log("Response yang dikirim ke client:", response); // Debugging
  return res.status(status).json(response);
};

export default responseHandler;
