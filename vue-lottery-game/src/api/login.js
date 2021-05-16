import request from "@/api/request";

export function getCurrentUser(username, password) {
  return request({
    url: "",
    method: "post",
    params: {
      username,
      password,
    },
  });
}
