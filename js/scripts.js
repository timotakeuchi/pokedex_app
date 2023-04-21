const pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type:['Grass', 'Poison']},
    {name: 'Ivysaur', height: 1, type:['Grass', 'Poison']},
    {name: 'Venusaur', height: 2, type:['Grass', 'Poison']}
  ]
  
    return {
      add: function(pokemon){
       pokemonList.push(pokemon);
    },
      getAll: function(){
       return pokemonList;
    }
   };
  })();
    
  
  
  // for (let i = 0; i < pokemonList.length; i++){
  //   if (pokemonList[i].height >= 2) {
  //       document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!</li>`)
  //   } else {
  //       document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height})</li>`)
  //   }
  // }
  pokemonRepository.add({name: 'Charmandar', height: 0.6, type: 'Fire'});
  
  pokemonRepository.getAll().forEach(function(pokemon){
    // if (pokemon.height >= 2) {
    //     document.write(`<li>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!</li>`)
    // } else {
    //     document.write(`<li>${pokemon.name} (height: ${pokemon.height})</li>`)}
    let pokemonList = document.querySelector('.pokemon-list')
    let pkListItem = document.createElement('li')
    let button = document.createElement('button')
    button.innerText('pokemon');
    button.classList.add('.pkbutton')
    pokemonList.firstChild.appendChild(button)
  });

  

