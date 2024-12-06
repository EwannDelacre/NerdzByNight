function bubble(x, y) {
    let leftColumn = document.getElementById('left-column');
    let rightColumn = document.getElementById('right-column');
    let  container;
    let centerColumn = document.getElementById('center-column');
    if(x < centerColumn.offsetWidth/2){
        container = leftColumn;
        // Déplace la colonne centrale vers la droite
        centerColumn.style.transform = 'translateX(15em)'; // 15 pixels vers la droite
        centerColumn.style.transition = 'transform 0.5s ease'; //Transition fluide

        // Déplace la colonne de gauche vers la droite
        leftColumn.style.transform = 'translateX(15em)'; // 15 pixels vers la gauche
        leftColumn.style.transition = 'transform 0.5s ease';

        // Déplace la colonne de droite vers la droite
        rightColumn.style.transform = 'translateX(15em)'; // 15 pixels vers la gauche
        rightColumn.style.transition = 'transform 0.5s ease';
    }else{
         container = rightColumn;

          // Déplace la colonne centrale vers la gauche
        centerColumn.style.transform = 'translateX(-15em)'; // 15 pixels vers la droite
        centerColumn.style.transition = 'transform 0.5s ease'; //Transition fluide

        // Déplace la colonne de gauche vers la gauche
        leftColumn.style.transform = 'translateX(-15em)'; // 15 pixels vers la gauche
        leftColumn.style.transition = 'transform 0.5s ease';

        // Déplace la colonne de droite vers la gauche
        rightColumn.style.transform = 'translateX(-15em)'; // 15 pixels vers la gauche
        rightColumn.style.transition = 'transform 0.5s ease';
    }
    const textContainers = document.querySelectorAll('.text-container');
    textContainers.forEach(container => {
                      container.style.display = 'none'; // Cacher l'élément
                 });
    container.innerHTML = "<div class='text-container' style='position: relative; '><p>Ceci est un exemple de texte à l'intérieur d'une div. Tu peux y ajouter autant de contenu que tu veux, comme des paragraphes, des images, etc.</p></div>";
}
  



