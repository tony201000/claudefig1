import { db, collection, doc, getDocs, getDoc } from "./firebase-config.js";
import { db, collection, doc, getDocs, getDoc, setDoc } from "./firebase-config.js";

async function updatePersonnages() {
    const marqueSelect = document.getElementById('marque');
    const personnageSelect = document.getElementById('personnage');
    const labelPersonnage = document.getElementById('labelPersonnage');
    const selectedMarque = marqueSelect.value;

    if (selectedMarque) {
        personnageSelect.innerHTML = '<option value="">Sélectionnez un personnage</option>';
        const personnagesSnapshot = await getDocs(collection(db, 'marques', selectedMarque, 'personnages'));
        personnagesSnapshot.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = doc.data().name;
            personnageSelect.appendChild(option);
        });
        labelPersonnage.style.display = 'block';
        personnageSelect.style.display = 'block';
    } else {
        labelPersonnage.style.display = 'none';
        personnageSelect.style.display = 'none';
    }
    updateSeries();
}

async function updateSeries() {
    const marqueSelect = document.getElementById('marque');
    const personnageSelect = document.getElementById('personnage');
    const serieSelect = document.getElementById('serie');
    const labelSerie = document.getElementById('labelSerie');
    const selectedMarque = marqueSelect.value;
    const selectedPersonnage = personnageSelect.value;

    if (selectedPersonnage) {
        serieSelect.innerHTML = '<option value="">Sélectionnez une série</option>';
        const seriesSnapshot = await getDocs(collection(db, 'marques', selectedMarque, 'personnages', selectedPersonnage, 'series'));
        seriesSnapshot.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = doc.data().name;
            serieSelect.appendChild(option);
        });
        labelSerie.style.display = 'block';
        serieSelect.style.display = 'block';
    } else {
        labelSerie.style.display = 'none';
        serieSelect.style.display = 'none';
    }
    updateEditions();
}

async function updateEditions() {
    const marqueSelect = document.getElementById('marque');
    const personnageSelect = document.getElementById('personnage');
    const serieSelect = document.getElementById('serie');
    const editionSelect = document.getElementById('edition');
    const labelEdition = document.getElementById('labelEdition');
    const selectedMarque = marqueSelect.value;
    const selectedPersonnage = personnageSelect.value;
    const selectedSerie = serieSelect.value;

    if (selectedSerie) {
        editionSelect.innerHTML = '<option value="">Sélectionnez une édition</option>';
        const editionsSnapshot = await getDocs(collection(db, 'marques', selectedMarque, 'personnages', selectedPersonnage, 'series', selectedSerie, 'editions'));
        editionsSnapshot.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = doc.data().name;
            editionSelect.appendChild(option);
        });
        labelEdition.style.display = 'block';
        editionSelect.style.display = 'block';
    } else {
        labelEdition.style.display = 'none';
        editionSelect.style.display = 'none';
    }
    updateModeles();
}

async function updateModeles() {
    const marqueSelect = document.getElementById('marque');
    const personnageSelect = document.getElementById('personnage');
    const serieSelect = document.getElementById('serie');
    const editionSelect = document.getElementById('edition');
    const modeleSelect = document.getElementById('modele');
    const labelModele = document.getElementById('labelModele');
    const selectedMarque = marqueSelect.value;
    const selectedPersonnage = personnageSelect.value;
    const selectedSerie = serieSelect.value;
    const selectedEdition = editionSelect.value;

    if (selectedEdition) {
        modeleSelect.innerHTML = '<option value="">Sélectionnez un modèle</option>';
        const modelesSnapshot = await getDocs(collection(db, 'marques', selectedMarque, 'personnages', selectedPersonnage, 'series', selectedSerie, 'editions', selectedEdition, 'modeles'));
        modelesSnapshot.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = doc.data().name;
            modeleSelect.appendChild(option);
        });
        labelModele.style.display = 'block';
        modeleSelect.style.display = 'block';
    } else {
        labelModele.style.display = 'none';
        modeleSelect.style.display = 'none';
    }
    showFigurine();
}

async function showFigurine() {
    const marqueSelect = document.getElementById('marque');
    const personnageSelect = document.getElementById('personnage');
    const serieSelect = document.getElementById('serie');
    const editionSelect = document.getElementById('edition');
    const modeleSelect = document.getElementById('modele');
    const figurineInfo = document.getElementById('figurineInfo');
    const selectedMarque = marqueSelect.value;
    const selectedPersonnage = personnageSelect.value;
    const selectedSerie = serieSelect.value;
    const selectedEdition = editionSelect.value;
    const selectedModele = modeleSelect.value;

    if (selectedModele) {
        const docRef = doc(db, 'marques', selectedMarque, 'personnages', selectedPersonnage, 'series', selectedSerie, 'editions', selectedEdition, 'modeles', selectedModele);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            figurineInfo.innerHTML = `
                <h2>Informations sur la figurine</h2>
                <p>Marque: ${selectedMarque}</p>
                <p>Personnage: ${selectedPersonnage}</p>
                <p>Série: ${selectedSerie}</p>
                <p>Édition: ${selectedEdition}</p>
                <p>Modèle: ${selectedModele}</p>
                <p>Description: ${data.description}</p>
                <p>Prix: ${data.price} €</p>
                <img src="${data.imageUrl}" alt="Image de ${selectedModele}" />
            `;
            figurineInfo.style.display = 'block';
        } else {
            figurineInfo.innerHTML = '<p>Figurine non trouvée.</p>';
            figurineInfo.style.display = 'block';
        }
    } else {
        figurineInfo.style.display = 'none';
    }
}

// Initialisation des options de marques
window.onload = async () => {
    const marqueSelect = document.getElementById('marque');
    const marquesSnapshot = await getDocs(collection(db, 'marques'));
    marquesSnapshot.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.data().name;
        marqueSelect.appendChild(option);
    });
};

async function addFigurine(event) {
    event.preventDefault();

    const marque = document.getElementById('addMarque').value;
    const personnage = document.getElementById('addPersonnage').value;
    const serie = document.getElementById('addSerie').value;
    const edition = document.getElementById('addEdition').value;
    const modele = document.getElementById('addModele').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value;

    const marqueRef = doc(db, 'marques', marque);
    const personnageRef = doc(marqueRef, 'personnages', personnage);
    const serieRef = doc(personnageRef, 'series', serie);
    const editionRef = doc(serieRef, 'editions', edition);
    const modeleRef = doc(editionRef, 'modeles', modele);

    try {
        await setDoc(marqueRef, { name: marque });
        await setDoc(personnageRef, { name: personnage });
        await setDoc(serieRef, { name: serie });
        await setDoc(editionRef, { name: edition });
        await setDoc(modeleRef, {
            name: modele,
            description: description,
            price: parseFloat(price),
            imageUrl: imageUrl
        });

        alert('Figurine ajoutée avec succès!');
        document.getElementById('addForm').reset();
    } catch (error) {
        console.error("Erreur lors de l'ajout de la figurine: ", error);
        alert('Erreur lors de l\'ajout de la figurine.');
    }
}

document.getElementById('addForm').addEventListener('submit', addFigurine);