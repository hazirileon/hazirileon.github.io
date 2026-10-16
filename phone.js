let currentFoundUser = null;

function checkPhoneStep() {
    const phoneInput = document.getElementById('phoneInput');
    
    // Ohrani brskalnikov required pop-up ob praznem polju
    if (!phoneInput.checkValidity()) {
        phoneInput.reportValidity();
        return;
    }

    const countryCode = document.getElementById('countryCode').value;
    const phoneVal = phoneInput.value.trim();
    const fullPhoneNumber = countryCode + phoneVal;
    
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    } catch (e) {
        users = [];
    }

    const foundUser = users.find(u => u.phone === fullPhoneNumber);

    if (!foundUser) {
        Swal.fire({
            icon: 'error',
            title: 'Uporabnik ne obstaja',
            text: 'Uporabnik s to telefonsko številko ne obstaja! Prosimo, registrirajte se.',
            confirmButtonColor: '#1d9bf0'
        });
        return;
    }

    currentFoundUser = foundUser;

    // Preklop na vnos gesla
    document.getElementById('phoneStepContainer').style.display = 'none';
    document.getElementById('step2Container').style.display = 'block';

    const passwordInput = document.getElementById('password');
    passwordInput.value = ''; // Počistimo vnos gesla
    passwordInput.setAttribute('required', 'true');
    document.getElementById('userInfoDisplay').textContent = `Prijava kot: @${foundUser.username}`;
}

function handlePhonePasswordSubmit(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password');

    // Preverimo required za geslo
    if (!passwordInput.checkValidity()) {
        passwordInput.reportValidity();
        return;
    }

    const passwordVal = passwordInput.value;

    if (currentFoundUser && currentFoundUser.password === passwordVal) {
        Swal.fire({
            icon: 'success',
            title: 'Prijava je uspešna!',
            text: 'Dobrodošli nazaj.',
            confirmButtonColor: '#1d9bf0'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'index.html';
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Napačno geslo',
            text: 'Napačno geslo. Poskusite znova.',
            confirmButtonColor: '#1d9bf0'
        });
    }
}

function goBackToPhoneStep() {
    currentFoundUser = null;
    document.getElementById('step2Container').style.display = 'none';
    document.getElementById('phoneStepContainer').style.display = 'block';
    
    const passwordInput = document.getElementById('password');
    passwordInput.removeAttribute('required');
    passwordInput.value = '';
}

// Povežemo obrazec z dogodkom oddaje
document.getElementById('phoneLoginForm').addEventListener('submit', handlePhonePasswordSubmit);
