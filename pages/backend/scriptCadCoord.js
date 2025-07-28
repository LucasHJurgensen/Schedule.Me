import{CordRegister} from './CordRegister.js';

document.getElementById("cadCord").addEventListener("submit", function(event){event.preventDefault();

    let coordName = document.getElementById("coordNome").value;
    let userRelated = document.getElementById("usuarioSelect").value;
    
    CordRegister(coordName, userRelated);
    
});
