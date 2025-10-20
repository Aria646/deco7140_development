const fetchGetData = (url, headers = {}) => {
  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) throw new Error("Server error");
      return response.json();
    })
    .catch((error) => {
      console.error("GET error:", error);
      return null;
    });
};

export { fetchGetData };
