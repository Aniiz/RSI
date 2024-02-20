document.addEventListener('DOMContentLoaded', function () {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('Email');
    const emailHelp = document.getElementById('emailHelp');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (emailRegex.test(emailInput.value)) {
            try {
                await fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: emailInput.value }),
                });

                styleChange(true, emailHelp, emailInput)
            } catch (error) {
                console.error('Erro ao enviar e-mail para o servidor:', error);
            }
        } else {
            styleChange(false, emailHelp, emailInput)
        }
    });
});

const styleChange = (bool, validationReference, input) => {
    if (bool) {
        validationReference.textContent = 'Email enviado com sucesso';
        validationReference.style.visibility = 'visible';
        input.value = '';
    } else {
        validationReference.textContent = 'Email inválido';
        validationReference.style.visibility = 'visible';
    }
}