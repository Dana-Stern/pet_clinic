export const getTodaysDateFormatted = () => new Date().toJSON().slice(0, 10);

export const getPatientBirthDateFormatted = (patientBirthDate: Date) =>
  new Date(patientBirthDate).toJSON().slice(0, 10);

export const getAge = (patientBirthDate: Date) => {
  const currentDate = new Date();
  const birthDate = new Date(patientBirthDate);

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
