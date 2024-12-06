function bubble(x, y, pointId) {
    // Récupère la largeur de la fenêtre
    const windowWidth = window.innerWidth;

    // Récupère la taille de police de base (taille 1em)
    const htmlElement = document.documentElement;
    const baseFontSize = parseFloat(getComputedStyle(htmlElement).fontSize); // En pixels

    let ismoved = false;
    let leftColumn = document.getElementById('left-column');
    let rightColumn = document.getElementById('right-column');
    let container;
    let centerColumn = document.getElementById('center-column');

    // Vérifie s'il y a déjà un conteneur ouvert
    const existingTextContainer = document.querySelector('.text-container.active');

    // Si un conteneur est déjà ouvert
    if (existingTextContainer) {
        // Si c'est le même point, on ferme tout
        if (existingTextContainer.closest('.column') === (x < centerColumn.offsetWidth/2 ? leftColumn : rightColumn)) {
            closeBubble();
            return;
        }
        
        // Sinon, on ferme d'abord l'existant
        closeBubble();
    }

    if(x < document.getElementById("center-column").offsetWidth/2){
        container = leftColumn;
        // Déplace la colonne centrale vers la droite
        centerColumn.style.transform = 'translateX(15em)';
        // Déplace la colonne de gauche vers la droite
        leftColumn.style.transform = 'translateX(15em)';
        // Déplace la colonne de droite vers la droite
        rightColumn.style.transform = 'translateX(15em)';
        ismoved = true;
    } else {
        container = rightColumn;
        // Déplace la colonne centrale vers la gauche
        centerColumn.style.transform = 'translateX(-15em)';
        // Déplace la colonne de gauche vers la gauche
        leftColumn.style.transform = 'translateX(-15em)';
        // Déplace la colonne de droite vers la gauche
        rightColumn.style.transform = 'translateX(-15em)';
        ismoved = true;
    }

if(pointId == "cerveau"){
    container.innerHTML = "<div class='text-container active' style='position: relative;'><h2>Le système nerveux humain et l'océan</h2></br><p>Le système nerveux humain, avec ses neurones qui transmettent des signaux, est essentiel pour la communication et la régulation des fonctions corporelles. De la même manière, l'océan fonctionne comme un réseau complexe, où les courants marins transportent des nutriments et influencent le climat.Tout comme le système nerveux ajuste la respiration et la circulation en réponse aux stimuli, l'océan régule le climat terrestre et absorbe le dioxyde de carbone, jouant un rôle crucial dans la lutte contre le changement climatique. Les interactions entre les espèces marines, semblables aux connexions neuronales, maintiennent la biodiversité et l'équilibre des écosystèmes.En protégeant nos océans, nous préservons un système vital qui, tout comme notre corps, est interconnecté et fragile.</p></div>";
}else if(pointId == "coeur"){
    container.innerHTML = "<div class='text-container active' style='position: relative;'><h2>Cœur et courants marins</h2></br><p>Le cœur humain, en tant que moteur du système circulatoire, pompe le sang à travers le corps, assurant l'apport d'oxygène et de nutriments aux cellules. De manière similaire, les courants marins, alimentés par la pompe thermohaline, circulent dans les océans, transportant chaleur, nutriments et gaz dissous à travers les profondeurs marines. La pompe thermohaline, qui fonctionne grâce aux différences de température et de salinité, agit comme un régulateur climatique, tout comme le cœur régule la pression sanguine et le flux sanguin.<img src='img/pompe.webp' style='width: 100%; height: auto;'> Ensemble, ces systèmes garantissent la santé et l'équilibre, que ce soit dans notre corps ou dans l'écosystème océanique. En protégeant nos océans, nous préservons ce système vital qui, tout comme notre cœur, est essentiel à la vie sur Terre.</p></div>";
}else if(pointId == "poumon"){
    container.innerHTML = "<div class='text-container active' style='position: relative;'><h2>Poumons et échanges gazeux</h2></br><p>Les poumons, en tant qu'organes respiratoires, jouent un rôle crucial dans les échanges gazeux, permettant l'absorption de l'oxygène et l'élimination du dioxyde de carbone. De manière similaire, les océans agissent comme des poumons de la planète, absorbant une grande partie du dioxyde de carbone atmosphérique et libérant de l'oxygène grâce à la photosynthèse des phytoplanctons. <img src='img/gaz.jpg' style='width: 100%; height: auto;'></br>Tout comme les poumons régulent la composition de l'air dans notre corps, les océans régulent le climat et la qualité de l'air sur Terre. Protéger nos océans, c'est préserver cette fonction vitale qui soutient la vie sur notre planète.</p></div>";
}else if(pointId == "digestif"){
    container.innerHTML = "<div class='text-container active' style='position: relative;'><h2>Système digestif et récifs coralliens</h2></br><p>Le système digestif humain transforme les aliments en nutriments essentiels, permettant à notre corps de fonctionner correctement. De manière similaire, les récifs coralliens agissent comme des écosystèmes riches en biodiversité, fournissant un habitat et des ressources nutritives pour de nombreuses espèces marines. Tout comme le système digestif décompose les aliments pour en extraire les nutriments, les récifs coralliens soutiennent le réseau trophique océanique, où chaque espèce joue un rôle crucial dans l'équilibre de l'écosystème.<img src='img/corail.jpg' style='width: 100%; height: auto;'> Protéger les récifs coralliens, c'est préserver cette chaîne alimentaire vitale qui soutient la vie marine et, par extension, la santé de notre planète.</p></div>";
}else if(pointId == "id"){
    container.innerHTML = "<div class='text-container active' style='position: relative;'><h2>Écho le dauphin et son environnement</h2></br><p>Écho, le dauphin, utilise son écholocation pour naviguer dans l'océan, tout comme notre système nerveux nous guide dans notre environnement. Grâce à son cœur, il maintient des liens sociaux forts avec son groupe, et ses poumons lui permettent de plonger profondément à la recherche de nourriture. Son système digestif transforme les proies en énergie, soutenant ainsi sa vie active dans les eaux marines. Protéger Écho et son habitat, c'est préserver l'équilibre de l'écosystème marin.<img src='img/echo.jpg' style='width: 100%; height: auto;'></p></div>";
}

}
  
function closeBubble() {
    // Réinitialise les positions des colonnes
    document.getElementById('center-column').style.transform = '';
    document.getElementById('left-column').style.transform = '';
    document.getElementById('right-column').style.transform = '';

    // Supprime tous les conteneurs de texte
    const textContainers = document.querySelectorAll('.text-container');
    textContainers.forEach(container => {
        container.remove(); // Supprime complètement l'élément
    });
}



/*function etape(etape) {
    // Cacher tous les éléments
    let etapes = document.getElementsByClassName("etape1");
    for (let i = 0; i < etapes.length; i++) {
        etapes[i].style.display = "none";
    }

    etapes = document.getElementsByClassName("etape2");
    for (let i = 0; i < etapes.length; i++) {
        etapes[i].style.display = "none";
    }

    etapes = document.getElementsByClassName("etape3");
    for (let i = 0; i < etapes.length; i++) {
        etapes[i].style.display = "none";
    }

    // Afficher l'étape correspondante
    if (etape == 1) {
        etapes = document.getElementsByClassName("etape1");
        for (let i = 0; i < etapes.length; i++) {
            etapes[i].style.display = "inline-block";
        }
    } else if (etape == 2) {
        etapes = document.getElementsByClassName("etape2");
        for (let i = 0; i < etapes.length; i++) {
            etapes[i].style.display = "inline-block";
        }
    } else if (etape == 3) {
        etapes = document.getElementsByClassName("etape3");
        for (let i = 0; i < etapes.length; i++) {
            etapes[i].style.display = "inline-block";
        }
    }
}*/




// Reste du code identique
document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelectorAll('.point');
    points.forEach(point => {
        point.addEventListener('click', (event) => {
            // Récupère les dimensions de la colonne centrale

            // Calcule les coordonnées relatives à la colonne centrale
            let x = event.clientX 
        let y = event.clientY 
        let pointId = event.target.id;

        bubble(x, y, pointId);

        });
    });
});