document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Aqui você fará a chamada para sua API de autenticação
        // Por enquanto, vamos apenas simular um redirecionamento
        if (username && password) {
            // Exemplo de como poderia ser a chamada para sua API
            /*
            fetch('sua-api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Armazenar token de autenticação, se aplicável
                    localStorage.setItem('authToken', data.token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Usuário ou senha inválidos');
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
            });
            */
            
            // Simulação temporária (remover quando integrar com a API)
            window.location.href = 'dashboard.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});