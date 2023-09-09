import * as Yup from "yup";
import { petType } from "./enums";
import { phoneNumberRegex } from "./string-utils";

export const PATIENT_VALIDATION_SCHEMA = Yup.object({
  ownerName: Yup.string().required("Required"),
  petName: Yup.string().required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(phoneNumberRegex, "Phone number must be 10 digits"),
  petBirthDate: Yup.date()
    .max(new Date(), "Selected date cannot be in the future")
    .required("Required"),
  type: Yup.string().oneOf(Object.values(petType)).required("Required"),
});
