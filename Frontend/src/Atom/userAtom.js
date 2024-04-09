import { atom } from "recoil";

export const userAtom = atom({
    key:"atom_user",
    default:JSON.parse(localStorage.getItem("user"))
})