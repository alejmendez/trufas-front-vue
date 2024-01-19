const API_URL = import.meta.env.VITE_API_URL

export const request = async ({ path, method, data }) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(`${API_URL}/${path}`, options);

  return await response.json();
}

export const get = ({ path, data }) => {
  return request({
    path,
    data,
    method: 'GET',
  })
}

export const post = ({ path, data }) => {
  return request({
    path,
    data,
    method: 'POST',
  })
}
