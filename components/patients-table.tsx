import { getAge } from "@/lib/dates-utils";
import { PatientFromDB } from "@/lib/interfaces";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import DataTable from "./data-table";
import ToolBar from "./tool-bar";
import LoadingAnimation from "./loading-animation";

const fetchPatients = async () => {
  const response = await axios.get("/api/patients");
  return response.data;
};

const PatientsTable = () => {
  const [ownerNameSearchValue, setOwnerNameSearchValue] = useState("");
  const [petNameSearchValue, setPetNameSearchValue] = useState("");
  const [selectedPetType, setSelectedPetType] = useState<string[]>([]);

  const {
    isLoading,
    error,
    data: patientsData,
  } = useQuery<{
    patients: PatientFromDB[];
  }>("read", fetchPatients);

  if (isLoading)
    return (
      <div className="flex h-32 items-center justify-center">
        <LoadingAnimation size="lg" />
      </div>
    );
  if (error)
    return (
      <div className="flex h-32 items-center justify-center">
        An error has occurred
      </div>
    );

  const patients = patientsData!.patients.map((patient) => ({
    ...patient,
    age: getAge(patient.petBirthDate),
  }));

  const filteredPatients = patients.filter(({ ownerName, petName, type }) =>
    ownerName.toLowerCase().includes(ownerNameSearchValue.toLowerCase()) &&
    petName.toLowerCase().includes(petNameSearchValue.toLowerCase()) &&
    selectedPetType.length === 0
      ? true
      : selectedPetType.includes(type),
  );

  return (
    <div className="space-y-4">
      <ToolBar
        ownerNameSearchValue={ownerNameSearchValue}
        setOwnerNameSearchValue={setOwnerNameSearchValue}
        petNameSearchValue={petNameSearchValue}
        setPetNameSearchValue={setPetNameSearchValue}
        selectedPetType={selectedPetType}
        setSelectedPetType={setSelectedPetType}
      />
      <DataTable patients={filteredPatients} patientsAmount={patients.length} />
    </div>
  );
};

export default PatientsTable;
