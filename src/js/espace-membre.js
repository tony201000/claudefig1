// Références aux éléments du DOM
const authSection = document.getElementById('auth-section');
const userProfile = document.getElementById('user-profile');
const userAnnouncements = document.getElementById('user-announcements');
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const logoutButton = document.getElementById('logout');
const profileInfo = document.getElementById('profile-info');
const announcementsList = document.getElementById('announcements-list');

// Fonction pour afficher les informations de l'utilisateur connecté
function displayUserInfo(user) {
    profileInfo.innerHTML = `
        <p><strong>Nom d'utilisateur:</strong> ${user.displayName || 'Non défini'}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;
}

// Fonction pour afficher les annonces de l'utilisateur
function displayUserAnnouncements(userId) {
    db.collection('annonces').where('userId', '==', userId).get()
        .then((querySnapshot) => {
            announcementsList.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const announcement = doc.data();
                announcementsList.innerHTML += `
                    <div>
                        <h3>${announcement.title}</h3>
                        <p>${announcement.description}</p>
                    </div>
                `;
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des annonces:", error);
        });
}

// Écouteur d'événements pour la connexion
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            console.error("Erreur de connexion:", error);
            alert("Erreur de connexion: " + error.message);
        });
});

// Écouteur d'événements pour l'inscription
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user.updateProfile({
                displayName: username
            });
        })
        .catch((error) => {
            console.error("Erreur d'inscription:", error);
            alert("Erreur d'inscription: " + error.message);
        });
});

// Écouteur d'événements pour la déconnexion
logoutButton.addEventListener('click', () => {
    firebase.auth().signOut();
});

// Écouteur d'état de l'authentification
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        authSection.style.display = 'none';
        userProfile.style.display = 'block';
        userAnnouncements.style.display = 'block';
        displayUserInfo(user);
        displayUserAnnouncements(user.uid);
    } else {
        authSection.style.display = 'flex';
        userProfile.style.display = 'none';
        userAnnouncements.style.display = 'none';
    }
});