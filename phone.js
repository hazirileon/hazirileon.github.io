let currentFoundUser = null;

        function checkPhoneStep() {
            const phoneInput = document.getElementById('phoneInput');
            
            // Sproži brskalnikov opozorilni oblaček, če je polje prazno
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
                alert('Uporabnik s to telefonsko številko ne obstaja! Prosimo, registrirajte se.');
                return;
            }

            currentFoundUser = foundUser;

            // Preklop na vnos gesla
            document.getElementById('phoneStepContainer').style.display = 'none';
            document.getElementById('step2Container').style.display = 'block';

            document.getElementById('password').setAttribute('required', 'true');
            document.getElementById('userInfoDisplay').textContent = `Prijava kot: @${foundUser.username}`;
        }

        function handlePhonePasswordSubmit(event) {
            event.preventDefault();

            const passwordVal = document.getElementById('password').value;
            const terms = document.querySelector('.terms');

            if (currentFoundUser && currentFoundUser.password === passwordVal) {
                document.getElementById('phoneLoginForm').style.display = 'none';
                if (terms) terms.style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
            } else {
                alert('Napačno geslo. Poskusite znova.');
            }
        }

        function goBackToPhoneStep() {
            currentFoundUser = null;
            document.getElementById('step2Container').style.display = 'none';
            document.getElementById('phoneStepContainer').style.display = 'block';
            document.getElementById('password').removeAttribute('required');
            document.getElementById('password').value = '';
        }

        function resetToHome() {
            window.location.href = 'index.html';
        }