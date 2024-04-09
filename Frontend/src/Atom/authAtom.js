import { atom } from "recoil";

export const authScreen = atom({
  key: "authScreen", // unique ID (with respect to other atoms/selectors)
  default: "login", // default value (aka initial value)
});
