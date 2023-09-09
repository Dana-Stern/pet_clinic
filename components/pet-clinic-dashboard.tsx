import Image from "next/image";
import VetIcon from "public/vet-icon.svg";
import PatientsTable from "./patients-table";
import NewPatient from "./new-patient";

const PetClinicDashboard = () => {
  return (
    <div className="mx-auto grid max-w-screen-md gap-y-4 p-4 font-body sm:max-w-screen-lg sm:p-8 md:max-w-screen-xl">
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Image src={VetIcon} alt="logo" height={50} width={50} />
        <span className="mr-0 text-xl font-bold text-violet-500 sm:mr-auto sm:text-3xl">
          My Pet Clinic
        </span>
        <NewPatient />
      </div>
      <div className="rounded-lg border p-4">
        <PatientsTable />
      </div>
    </div>
  );
};

export default PetClinicDashboard;
