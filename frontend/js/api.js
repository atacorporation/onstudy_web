// 1. FIREBASE AYARLARI (import satırları yok!)
const firebaseConfig = {
    apiKey: "AIzaSyCWhL0d5NWex9XEyA441M9kF9UX8SlM0V8",
    authDomain: "onstudy-1a735.firebaseapp.com",
    projectId: "onstudy-1a735",
    storageBucket: "onstudy-1a735.firebasestorage.app",
    messagingSenderId: "513055184070",
    appId: "1:513055184070:web:038ecc9e2d6ba67b56f3c7",
    measurementId: "G-CG7KEP012P"
};

// Firebase başlatma kontrolü
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// 2. GÜVENLİK (Giriş yapmayanları dışarı at, giriş yapanın adını yaz)
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Oturum yoksa veya çıkış yapıldıysa direkt giriş sayfasına yolla
        window.location.href = "index.html"; 
    } else {
        // Giriş yapılmışsa e-postanın @ işaretinden önceki kısmını ekrana yaz
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = user.email.split('@')[0];
        }
    }
});

// 3. ÇIKIŞ YAP (SIGN OUT) BUTONU
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log("Çıkış yapıldı.");
            // onAuthStateChanged tetikleneceği için yönlendirmeyi o halledecek
        }).catch((error) => {
            console.error("Çıkış hatası:", error);
        });
    });
}