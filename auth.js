let currentFoundUser = null;

function handleLoginSubmit(event) {
    event.preventDefault();
    event.stopImmediatePropagation(); // Prepreči morebitne podvojene klica dogodka

    const step1 = document.getElementById('step1Container');
    const step2 = document.getElementById('step2Container');
    const socialButtons = document.getElementById('socialButtons');
    const divizor = document.getElementById('divizor');
    const passwordInput = document.getElementById('password');

    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // 1. KORAK: Preverjanje e-pošte / uporabniškega imena
    if (!currentFoundUser) {
        const inputVal = document.getElementById('vnos').value.trim();
        const foundUser = users.find(u => u.email === inputVal || u.username === inputVal);

        if (!foundUser) {
            Swal.fire({
                icon: 'error',
                title: 'Uporabnik ne obstaja',
                text: 'Uporabnik s tem e-poštnim naslovom ali uporabniškim imenom ne obstaja! Prosimo, registrirajte se.',
                confirmButtonColor: '#1d9bf0'
            });
            return;
        }

        // Shranimo uporabnika
        currentFoundUser = foundUser;

        // Skrijemo elemente 1. koraka
        if (socialButtons) socialButtons.style.display = 'none';
        if (divizor) divizor.style.display = 'none';

        // Prikažemo 2. korak
        step1.style.display = 'none';
        step2.style.display = 'block';

        // Počistimo vnos za geslo in nastavimo atribute
        passwordInput.value = '';
        document.getElementById('vnos').removeAttribute('required');
        passwordInput.setAttribute('required', 'true');

        document.getElementById('userInfoDisplay').textContent = `Prijava kot: @${foundUser.username}`;
        
        // ZAVRČEMO nadaljevanje, da ne preveri gesla v tem kliku
        return;
    }

    // 2. KORAK: Preverjanje gesla ob naslednjem kliku na "Log in"
    const passwordVal = passwordInput.value;

    if (currentFoundUser.password === passwordVal) {
        Swal.fire({
            icon: 'success',
            title: 'Prijava je uspešna!',
            text: 'Dobrodošli nazaj.',
            confirmButtonColor: '#1d9bf0'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
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

// Funkcija za vrnitev v 1. korak (gumb Nazaj)
function goBackToStep1() {
    currentFoundUser = null;

    document.getElementById('step2Container').style.display = 'none';
    document.getElementById('step1Container').style.display = 'block';

    if (document.getElementById('socialButtons')) document.getElementById('socialButtons').style.display = 'flex';
    if (document.getElementById('divizor')) document.getElementById('divizor').style.display = 'flex';

    const passwordInput = document.getElementById('password');
    passwordInput.removeAttribute('required');
    passwordInput.value = '';
    document.getElementById('vnos').setAttribute('required', 'true');
}

// Poslušalec za oddajo obrazca
document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
