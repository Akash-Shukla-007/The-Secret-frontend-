import { config } from "../../config";
import axios from "../axios";

const gettingStarted = async (email: string) => {
  const url = config.BASE_URL + "/getting-started";
  return await axios.post(url, { email: email }, config.configs);
};
const login = async (data: object) => {
  const url = config.BASE_URL + "/login";
  return await axios.post(url, data);
};
const verifyotp = async (data: object) => {
  const url = config.BASE_URL + "/signup";
  return await axios.post(url, data, config.configs);
};
const forgotPassword = async (email: string) => {
  const url = config.BASE_URL + "/forgot-password";
  return await axios.post(url, { email: email }, config.configs);
};
const confirmEmail = async (data: object) => {
  const url = config.BASE_URL + "/confirm-email";
  return await axios.post(url, data, config.configs);
};
const newPassword = async (data: object) => {
  const url = config.BASE_URL + "/new-pass";
  return await axios.post(url, data, config.configs);
};

const defaultPage = async () => {
  const url = config.BASE_URL + "/default";
  return await axios.get(url, config.config2);
};

const deleteNote = async (id: string) => {
  const url = config.BASE_URL + "/delete-note";
  return await axios.post(url, { id: id }, config.config2);
};

const AddNote = async (data: object) => {
  const url = config.BASE_URL + "/add-note";
  return await axios.post(url, data, config.config2);
};

const editNote = async (data: object) => {
  const url = config.BASE_URL + "/edit-note";
  return await axios.post(url, data, config.config2);
};

const myProfile = async () => {
  const url = config.BASE_URL + "/profile";
  return await axios.get(url, config.config2);
};

export {
  gettingStarted,
  login,
  verifyotp,
  forgotPassword,
  confirmEmail,
  newPassword,
  defaultPage,
  deleteNote,
  AddNote,
  editNote,
  myProfile,
};
