import{subRegister} from '/schedule.me/pages/backend/subRegister.js';

<<<<<<< HEAD
document.getElementById("cadSubject").addEventListener("submit", function(event){event.preventDefault();
=======
document.getElementById("cadDisc-button").addEventListener("click", function(event){
    event.preventDefault();
>>>>>>> master

    let subject = document.getElementById("nDisciplina").value;
    let course = document.getElementById("cursoSelect").value;
    let teacher = document.getElementById("profSelect").value;
    let dayWeek = document.getElementById("diaSelect").value;
    let hourClass = document.getElementById("horaSelect").value;

    subRegister(subject, course, teacher, dayWeek, hourClass);
});