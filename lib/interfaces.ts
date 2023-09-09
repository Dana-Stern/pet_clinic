import { petType } from "./enums";

export interface Patient {
  ownerName: string;
  petName: string;
  phone: string;
  petBirthDate: Date;
  type: petType;
}

export interface PatientFromDB {
  _id: string;
  ownerName: string;
  petName: string;
  phone: string;
  petBirthDate: Date;
  type: petType;
}
