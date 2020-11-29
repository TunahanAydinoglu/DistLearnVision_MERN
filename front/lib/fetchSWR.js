const fetcherGet = (url) => fetch(url).then((res) => res.json());

async function fetcherPost(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    listen: "test",
    script: {
      id: "97ea642c-3396-4769-a3cc-9a1f531975d5",
      exec: [
        "var object = pm.response.json()\r",
        'pm.environment.set("access_token",object.access_token);',
      ],
      type: "text/javascript",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response);
  return response.json(); // parses JSON response into native JavaScript objects
}

export { fetcherGet, fetcherPost };
