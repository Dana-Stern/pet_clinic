// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from "@/lib/db";
import { petType } from "@/lib/enums";
import { Patient } from "@/lib/interfaces";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
interface PatientResult {
  patients?: Array<Patient> | Patient;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>,
) {
  if (req.method === "POST") {
    return await create(req, res);
  }
  if (req.method === "GET") {
    return await read(req, res);
  }
  if (req.method === "DELETE") {
    return await del(req, res);
  }
  if (req.method === "PUT") {
    return await update(req, res);
  }
}

const { DB_NAME } = process.env;

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collection = client.db(DB_NAME).collection("patients");
    const { ownerName, petBirthDate, type, phone, petName } = req.body;
    const newPatient = {
      ownerName: ownerName,
      petBirthDate: petBirthDate,
      petName: petName,
      type: type,
      phone: phone,
    };
    await collection.insertOne(newPatient);
    res.status(200).json({ newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Unable to create patient" });
  }
};
const read = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collection = client.db(DB_NAME).collection("patients");
    const patients = await collection.find({}).toArray();
    res.status(200).json({ patients });
  } catch (error) {
    console.error("Error reading patients:", error);
    res.status(500).json({ error: "Unable to fetch patients" });
  }
};
const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collection = client.db(DB_NAME).collection("patients");
    const { patientID } = req.body;
    await collection.deleteOne({ _id: new ObjectId(patientID) });
    res.status(200).json("patient deleted");
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Unable to delete patient" });
  }
};
const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collection = client.db(DB_NAME).collection("patients");
    const { _id, ownerName, petBirthDate, type, phone, petName } = req.body;
    const updatedPatient = {
      ownerName: ownerName,
      petBirthDate: petBirthDate,
      petName: petName,
      type: type as petType,
      phone: phone,
    };
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updatedPatient },
    );
    res.status(200).json({ updatedPatient });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Unable to update patient" });
  }
};
