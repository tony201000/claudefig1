//point d'entree de l'application

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Référence à Firestore
const db = firebase.firestore();

// Fonction pour charger les figurines à la une
function loadFeaturedFigurines() {
    db.collection("figurines").limit(4).get().then((querySnapshot) => {
        const featuredSection = document.getElementById("featured-figurines");
        querySnapshot.forEach((doc) => {
            const figurine = doc.data();
            const figurineElement = document.createElement("div");
            figurineElement.innerHTML = `
                <h3>${figurine.name}</h3>
                <p>${figurine.description}</p>
            `;
            featuredSection.appendChild(figurineElement);
        });
    });
}

// Fonction pour charger les annonces récentes
function loadRecentAnnouncements() {
    db.collection("annonces").orderBy("date", "desc").limit(5).get().then((querySnapshot) => {
        const announcementsSection = document.getElementById("recent-announcements");
        querySnapshot.forEach((doc) => {
            const annonce = doc.data();
            const annonceElement = document.createElement("div");
            annonceElement.innerHTML = `
                <h3>${annonce.title}</h3>
                <p>${annonce.description}</p>
            `;
            announcementsSection.appendChild(annonceElement);
        });
    });
}

// Chargement des données au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedFigurines();
    loadRecentAnnouncements();
});