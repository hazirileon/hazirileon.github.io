function checkPasswordStrength() {
            const password = document.getElementById('password').value;
            const bar = document.getElementById('strengthBar');
            const text = document.getElementById('strengthText');

            let strength = 0;

            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            if (password.length === 0) {
                bar.style.width = '0%';
                bar.style.backgroundColor = 'transparent';
                text.textContent = 'Minimum 8 characters (1 uppercase, 1 number, 1 special character)';
                text.style.color = '#71767b';
            } else if (strength <= 2) {
                bar.style.width = '33%';
                bar.style.backgroundColor = '#f4212e'; // Rdeča (šibko)
                text.textContent = 'Weak password';
                text.style.color = '#f4212e';
            } else if (strength === 3) {
                bar.style.width = '66%';
                bar.style.backgroundColor = '#ffad1f'; // Rumena (srednje)
                text.textContent = 'Medium password';
                text.style.color = '#ffad1f';
            } else {
                bar.style.width = '100%';
                bar.style.backgroundColor = '#00ba7c'; // Zelena (močno)
                text.textContent = 'Strong password!';
                text.style.color = '#00ba7c';
            }
        }

        function handleRegister(event) {
            event.preventDefault(); // Prepreči običajno osveževanje strani

            const username = document.getElementById('username').value;
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            const countryCode = document.getElementById('countryCode').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;

            // Preverjanje veljavnosti gesla
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
            if (!regex.test(password)) {
                alert('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
                return false;
            }

            // Ustvarimo objekt z vnosnimi podatki uporabnika
            const userData = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: countryCode + phone,
                password: password
            };

            // Pridobimo obstoječe uporabnike iz localStorage (ali prazen seznam, če jih še ni)
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Preverimo, ali e-pošta ali uporabniško ime že obstaja
            const userExists = users.some(u => u.email === email || u.username === username);
            if (userExists) {
                alert('A user with this email or username already exists!');
                return false;
            }

            // Dodamo novega uporabnika v seznam in ga shranimo nazaj v localStorage
            users.push(userData);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            alert('Registration successful! You can now log in.');

            // Preusmeritev na prijavno stran (index.html)
            window.location.href = 'index.html';

            return false;
        }

        // Povežemo funkcijo z obrazcem ob oddaji
        document.getElementById('registerForm').addEventListener('submit', handleRegister);