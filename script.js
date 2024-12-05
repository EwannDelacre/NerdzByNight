function bubble(x, y) {
    let  container;
    if(x < document.getElementById("center-column").offsetWidth/2){
        container = document.getElementById('left-column');
    }else{
         container = document.getElementById('right-column');
    }
    const textContainers = document.querySelectorAll('.text-container');
    textContainers.forEach(container => {
                      container.style.display = 'none'; // Cacher l'élément
                 });
    container.innerHTML = "<div class='text-container' style='position: relative; '><p>Ceci est un exemple de texte à l'intérieur d'une div. Tu peux y ajouter autant de contenu que tu veux, comme des paragraphes, des images, etc.</p></div>";
}
  