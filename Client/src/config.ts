const userToken = localStorage.getItem("loginToken");

export const config = {
  BASE_URL: "http://192.168.247.72:8000",
  configs: {
    headers: {
      "content-type": "application/json",
    },
  },
  config2: {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  },
};
