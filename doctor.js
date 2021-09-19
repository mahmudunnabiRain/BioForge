var doctors = [
    {
        doctorID: "6215",
        firstName: "Jalaluddin",
        lastName: "Mahbub",
        teamID: "008",
        doctorType: "Consultant",
        email: "jabub@hospital.com",
        active: true,
        doctorRequests: []
    },
    {
        doctorID: "6216",
        firstName: "Amin",
        lastName: "Morshed",
        teamID: "008",
        doctorType: "Assistant Consultant",
        email: "amhed@hospital.com",
        active: true
    },
    {
        doctorID: "6214",
        firstName: "Mahady",
        lastName: "Selim",
        teamID: "005",
        doctorType: "Consultant",
        email: "malim@hospital.com",
        active: true,
        doctorRequests: ["6213", ]
    },
    {
        doctorID: "6213",
        firstName: "Jamela",
        lastName: "Begum",
        teamID: "005",
        doctorType: "RMO",
        email: "jagum@hospital.com",
        active: false
    },

]

var team = [
    {
        teamName: "nephrology",
        teamID: "008",
        consultantInCharge: "6215",
        teamMates: ["6216",]
    },
    {
        teamName: "cardiology",
        teamID: "005",
        consultantInCharge: "6214",
        teamMates: []
    },
]


const addNewDoctor = (consultantID, firstName, lastName) => {
    doctors.sort( (a, b) => (a.doctorID > b.doctorID) ? 1 : -1 ); // Sorintg patients in order of their ID
    const newID  = parseInt(doctors[doctors.length - 1].doctorID) + 1;
    const email = (firstName.slice(0, 2) + lastName.slice(-3)).toLowerCase() + '@hospital.com';
    const newDoctor = {
        doctorID: `${newID}`,
        firstName: firstName,
        lastName: lastName,
        doctorType: "RMO",
        email: email,
        active: false
    }
    doctors = [...doctors, newDoctor];
    console.log(newDoctor);
    console.log('New doctor added...');
    doctors.forEach( function (doctor) {
        doctor.doctorID == consultantID ? doctor.doctorRequests = [...doctor.doctorRequests, `${newID}`] : null;
    });
    console.log(doctors);
    console.log('New doctor added...');
}

const assignTeam = (consultantID, doctorID, teamID) => {

    doctors.forEach( function (doctor) {
        doctor.doctorID == consultantID ? doctor.doctorRequests = doctor.doctorRequests.filter(id => id != doctorID) : null;
    });

    doctors.forEach( function (doctor) {
        doctor.doctorID == doctorID ? (doctor.active = true, doctor.teamID = teamID) : null;
    });
    console.log(doctors);

    team.forEach( function (targetTeam) {
        targetTeam.teamID == teamID ? targetTeam.teamMates = [...targetTeam.teamMates, doctorID] : null;
    });
    console.log(team);

}

const promoteDocotor = (doctorID) => {
    doctors.forEach( function (doctor) {
        doctor.doctorID == doctorID ? doctor.doctorType = 'Assistant Consultant' : null;
    });
    console.log(doctors);
}

const disableDocotor = (doctorID) => {
    var teamID;

    // deactivating account
    doctors.forEach( function (doctor) {
        doctor.doctorID == doctorID ? (doctor.active = false, teamID = doctor.teamID) : null;
    });

    //removing from team
    team.forEach( function (targetTeam) {
        targetTeam.teamID == teamID ? targetTeam.teamMates = targetTeam.teamMates.filter(id => id != doctorID) : null;
    });

    console.log(doctors);
    console.log(team);
}




addNewDoctor('6215', 'Mahmudunnabi', 'Rain');
assignTeam('6215', '6217', '008');
promoteDocotor('6217');
disableDocotor('6217');
