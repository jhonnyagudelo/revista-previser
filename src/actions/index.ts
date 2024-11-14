import { arrivalConfirmation, confirmAttendance } from "./attendance";
import { loginUser, logout, registerUser } from "./auth";
import { getCustomer } from "./customer";
import { createEvent, getEvent } from "./event";
import { getRole } from "./roles";

export const server ={
    registerUser,
    logout,
    loginUser,
    getCustomer,
    getRole,
    createEvent,
    getEvent,
    arrivalConfirmation,
    confirmAttendance

}