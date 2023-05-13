let pokemonRepository = (function () {
  let pkmnList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon 
    ) {
      pkmnList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
    // pokemonList.push(pokemon);
  }

  function getAll() {
    return pkmnList;
  }
  
  function addListItem (pokemon) { 
   //list of variables in the function
    let pokemonList = document.querySelector('.pokemon-list');
    let pkmnListItem = document.createElement('li');
    let button = document.createElement('button');
   //button features
    button.innerText = pokemon.name;
    button.classList.add('pkbutton');
   //appending children
    pokemonList.appendChild(pkmnListItem);
    pkmnListItem.appendChild(button);
   //event listener
    button.addEventListener('click', event => showDetails(pokemon));
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem 
  };
})();
  
  // for (let i = 0; i < pokemonList.length; i++){
  //   if (pokemonList[i].height >= 2) {
  //       document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!</li>`)
  //   } else {
  //       document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height})</li>`)
  //   }
  // }
  pokemonRepository.add({name: 'Charmandar', height: 0.6, types: 'Fire'});
  
pokemonRepository.getAll().forEach(function(pokemon){pokemonRepository.addListItem(pokemon)});
    // if (pokemon.height >= 2) {
    //     document.write(`<li>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!</li>`)
    // } else {
    //     document.write(`<li>${pokemon.name} (height: ${pokemon.height})</li>`)}