import { getPatients } from './patientsFromOtherHospitals.js';
const kidneysInStock = 5

var patients = [
  {
    firstName: "Shakira",
    lastName: "Hossain",
    patientID: "007",
    diseases: ["COVID", "1-kidney", "3/4-dissolved-brain"],
    isAdmitted: true,
  },
  {
    firstName: "Uzumaki",
    lastName: "Naruto",
    patientID: "008",
    diseases: ["Obesity"],
    isAdmitted: true,
  },
  {
    firstName: "Sheikh",
    lastName: "Selim Ahmed",
    patientID: "006",
    diseases: ["Broken heart", "Depression"],
    isAdmitted: true,
  },
  {
    firstName: "Rafsan",
    lastName: "Wayne",
    patientID: "009",
    diseases: ["COVID", "1-kidney", "Impaired vision"],
    isAdmitted: false,
  },
];



const printDetail = (patient) => {
  console.log(`ID: ${patient.patientID}  Name: ${patient.firstName} ${patient.lastName}   ${patient.diseases.length > 1 ? 'Diseases' : 'Disease'}:( ${patient.diseases} )`); // Printing patient informations
}

const allPatients = () => {
  console.log('\n\n\n...All Patients...\n');
  patients.sort( (a, b) => (a.patientID > b.patientID) ? 1 : -1 ); // Sorintg patients in order of their ID
  patients.forEach( function(patient) { // Iterating over patients
      printDetail(patient);
  });
}

const notAdmittedPatients = () => {
  console.log('\n\n\n...Patients who is not admitted yet...\n');
  patients.sort( (a, b) => (a.patientID > b.patientID) ? 1 : -1 ); // Sorintg patients in order of their ID
  patients.forEach( function(patient) { // Iterating over patients
    patient.isAdmitted ? null : printDetail(patient); // printing patient detail if not admitted
    patient.isAdmitted ? null : patient.isAdmitted = true; //getting them admitted
  });
}


const kidneyRequiredPatients = () => {
  console.log('\n\n\n...Patients who requires kidney...\n');
  var kidneysRequired = 0
  patients.sort( (a, b) => (a.patientID > b.patientID) ? 1 : -1 ); // Sorintg patients in order of their ID
  patients.forEach( function(patient) { // Iterating over patients
    patient.diseases.includes('1-kidney')? ( printDetail(patient), kidneysRequired++ ) : // cheking if patient has 1-kidney disease
    patient.diseases.includes('2-kidney')? ( printDetail(patient), kidneysRequired = kidneysRequired + 2) : // cheking if patient has 1-kidney disease
    null;
  });
  console.log(`# of patients need to finish the kidney stock: ${kidneysInStock - kidneysRequired}`)
}


const covidPatientDetails = (patient) => {
  console.log(`${patient.lastName}, ${patient.firstName}, ${patient.diseases.length > 1 ? patient.diseases.length+' Diseases' : patient.diseases.length+' Disease'}`); // Printing patient informations
}

const covidPatients = () => {
  console.log('\n\n\n...Patients who have COVID...\n');
  patients.sort( (a, b) => (a.patientID > b.patientID) ? 1 : -1 ); // Sorintg patients in order of their ID
  patients.forEach( function(patient) { // Iterating over patients
    patient.diseases.includes('COVID')? covidPatientDetails(patient) : null// printing if patient has COVID
    null;
  });
}


const admitPatientsFromOtherHospitals = () =>{
  
  console.log('\n\n\n...Admitting patients from other hospitals...\n');

  var lastID  = parseInt(patients[patients.length - 1].patientID);

  getPatients().forEach( function(patient) { // Iterating over new patients
    
    patients.sort( (a, b) => (a.patientID > b.patientID) ? 1 : -1 ); // Sorintg patients in order of their ID
    patient.patientID = `${lastID + 1}`;
    lastID += 1;
    patient.isAdmitted = true;
  })
  patients = [...patients, ...getPatients()];
  console.log('Patients Added');
  console.log(patients);

}

allPatients();
notAdmittedPatients();
kidneyRequiredPatients();
covidPatients();
admitPatientsFromOtherHospitals();


