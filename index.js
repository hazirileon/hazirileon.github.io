// Upravljanje QR modala
function openQrModal() {
    document.getElementById("qrModal").style.display = "flex";
}

function closeQrModal() {
    document.getElementById("qrModal").style.display = "none";
}

// --- 1. Google prijava ---
function handleGoogleResponse(response) {
    const credential = response.credential;
    console.log("Google žeton (Token):", credential);
    // Tukaj pošlješ žeton na svoj strežnik v preverjanje
    alert("Uspešna Google prijava!");
}
function handleCustomGoogleLogin() {
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.prompt(); // Odpre Google prijavno okno/pop-up
    } else {
        console.error("Google SDK še ni naložen.");
    }
}
// --- 2. Apple prijava ---
document.addEventListener('DOMContentLoaded', () => {
    if (window.AppleID) {
        AppleID.auth.init({
            clientId: 'TVOJ_APPLE_CLIENT_ID', // npr. com.tvojadomena.app
            scope: 'name email',
            redirectURI: 'https://tvojadomena.com/auth/apple/callback',
            state: 'origin:web',
            usePopup: true
        });
    }
});

async function handleAppleLogin() {
    try {
        const response = await AppleID.auth.signIn();
        console.log("Apple odgovor:", response);
        alert("Uspešna Apple prijava!");
    } catch (error) {
        console.error("Napaka pri Apple prijavi:", error);
    }
}

function handlePhoneLogin() {
    window.location.href = 'phone.html';
}
