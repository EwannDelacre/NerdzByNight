function bubble(x, y) {
    let ismoved = false;
    let leftColumn = document.getElementById('left-column');
    let rightColumn = document.getElementById('right-column');
    let centerColumn = document.getElementById('center-column');
    let container;

    // Détermine la direction en fonction de la position horizontale
    if (x < centerColumn.offsetWidth / 2) {
        container = leftColumn;
        // Déplace les colonnes vers la droite
        centerColumn.style.transform = 'translateX(15em)';
        leftColumn.style.transform = 'translateX(15em)';
        rightColumn.style.transform = 'translateX(15em)';
        ismoved = true;
    } else {
        container = rightColumn;
        // Déplace les colonnes vers la gauche
        centerColumn.style.transform = 'translateX(-15em)';
        leftColumn.style.transform = 'translateX(-15em)';
        rightColumn.style.transform = 'translateX(-15em)';
        ismoved = true;
    }

    // Cache toutes les divs avec la classe 'text-container'
    const textContainers = document.querySelectorAll('.text-container');
    textContainers.forEach(container => {
        container.style.display = 'none';
    });

    // Met à jour le contenu du conteneur ciblé
    container.innerHTML = `
        <div id="container">
            <div class="container">
                <h1>La Peau et l'Océan</h1>
                <p>La peau et l'océan partagent une organisation en couches :</p>
                <img id="coucheocean" src="coucheocean.png" alt="Illustration des couches de l'océan" />
                <p><strong>Peau :</strong> Épiderme en surface, derme au centre, hypoderme en profondeur.</p>
                <p><strong>Océan :</strong> Zone épipélagique éclairée, mésopélagique intermédiaire, et bathypélagique sombre.</p>
                <p>Ces structures protègent, soutiennent et régulent les échanges essentiels à la vie.</p>
            </div>
        </div>`;
}

// Vérifie si le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne toutes les divs avec la classe "point"
    const points = document.querySelectorAll('.point');

    // Ajoute un événement à chaque div
    points.forEach(point => {
        point.addEventListener('click', (event) => {
            let x = event.clientX; // Position horizontale du clic
            let y = event.clientY; // Position verticale du clic
            bubble(x, y); // Appelle la fonction bubble avec les coordonnées
        });
    });
});
