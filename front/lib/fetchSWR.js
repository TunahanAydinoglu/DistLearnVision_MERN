const fetcherGet = (url) => fetch(url).then((res) => res.json());

async function fetcherPost(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // or without this line
    redirect: "follow",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(response => response.json()).catch(err=>console.log(err));
  return response; // parses JSON response into native JavaScript objects
}

export { fetcherGet, fetcherPost };
