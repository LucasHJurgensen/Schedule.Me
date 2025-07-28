// passwordStrength.js - Script para visualização da força da senha

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('senha');
    const strengthBar = document.getElementById('passwordStrength');
    
    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', function(e) {
            const password = e.target.value;
            let strength = 0;
            
            // Critérios de força da senha
            if (password.length > 0) strength += 20;
            if (password.length >= 8) strength += 30;
            if (/[A-Z]/.test(password)) strength += 20;
            if (/\d/.test(password)) strength += 20;
            if (/[^A-Za-z0-9]/.test(password)) strength += 10;
            
            // Atualiza a barra visual
            strengthBar.style.width = strength + '%';
            
            // Altera a cor baseada na força
            if (strength < 50) {
                strengthBar.style.backgroundColor = '#ff5252'; // Vermelho
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#ffb142'; // Laranja
            } else {
                strengthBar.style.backgroundColor = '#2ecc71'; // Verde
            }
        });
    } else {
        console.log('Elementos da força da senha não encontrados');
    }
});