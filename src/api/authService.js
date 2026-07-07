import axiosInstance from "../utils/axiosInstance";

export const signupUser = async (payload) => {
  const { data } = await axiosInstance.post("/auth/signup", payload);

  return data;
};

export const LogInUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  console.log(credentials);
  console.log(data);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};
