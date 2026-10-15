let currentFoundUser = null;

        function handleLoginSubmit(event) {
            event.preventDefault();

            const step1 = document.getElementById('step1Container');
            const step2 = document.getElementById('step2Container');
            const socialButtons = document.getElementById('socialButtons');
            const divizor = document.getElementById('divizor');

            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            if (!currentFoundUser) {
                // 1. KORAK: Preverjanje e-pošte/uporabniškega imena
                const inputVal = document.getElementById('vnos').value.trim();
                const foundUser = users.find(u => u.email === inputVal || u.username === inputVal);

                if (!foundUser) {
                    alert('Uporabnik s tem e-poštnim naslovom ali uporabniškim imenom ne obstaja! Prosimo, registrirajte se.');
                    return;
                }

                currentFoundUser = foundUser;

                // Skrijemo gumbe in divider
                if (socialButtons) socialButtons.style.display = 'none';
                if (divizor) divizor.style.display = 'none';

                // Preklopimo koraka
                step1.style.display = 'none';
                step2.style.display = 'block';
                
                // Prilagodimo obveznost polj
                document.getElementById('vnos').removeAttribute('required');
                document.getElementById('password').setAttribute('required', 'true');

                document.getElementById('userInfoDisplay').textContent = `Prijava kot: @${foundUser.username}`;
                
            } else {
                // 2. KORAK: Preverjanje gesla
                const passwordVal = document.getElementById('password').value;
                const terms = document.getElementById('termsBox');

                if (currentFoundUser.password === passwordVal) {
                    document.getElementById('loginForm').style.display = 'none';
                    if (terms) terms.style.display = 'none';
                    document.getElementById('successMessage').style.display = 'block';
                } else {
                    alert('Napačno geslo. Poskusite znova.');
                }
            }
        }

        // Funkcija za vrnitev v 1. korak (gumb Nazaj)
        function goBackToStep1() {
            currentFoundUser = null;

            document.getElementById('step2Container').style.display = 'none';
            document.getElementById('step1Container').style.display = 'block';

            // Vrnemo gumbe in divider
            document.getElementById('socialButtons').style.display = 'flex';
            document.getElementById('divizor').style.display = 'flex';

            // Prilagodimo obveznost polj nazaj
            document.getElementById('password').removeAttribute('required');
            document.getElementById('password').value = '';
            document.getElementById('vnos').setAttribute('required', 'true');
        }

        // Funkcija za vrnitev na začetni zaslon (gumb Domov)
        function resetToHome() {
            window.location.reload(); // Osveži stran in ponastavi obrazec
        }