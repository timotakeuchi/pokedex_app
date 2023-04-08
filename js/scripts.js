// // let pokemonRepository = (function () { 
// let pokemonList = [
//     {
//         name: 'Bulbasaur', 
//         height: 0.7, 
//         type:['Grass', 'Poison']
//     },
//     {
//         name: 'Ivysaur', 
//         height: 1, 
//         type:['Grass', 'Poison']
//     },
//     {
//         name: 'Venusaur', 
//         height: 2, 
//         type:['Grass', 'Poison']
//     }
// ];

//   function getAll (pokemon) {
//     return pokemonlist
//   };

//   function add (item) {
//     return { name: 'Charmander', height: 0.6, type: 'fire'}
//   }

// })();

let pokemonList = [
    {
        name: 'Bulbasaur', 
        height: 0.7, 
        type:['Grass', 'Poison']
    },
    {
        name: 'Ivysaur', 
        height: 1, 
        type:['Grass', 'Poison']
    },
    {
        name: 'Venusaur', 
        height: 2, 
        type:['Grass', 'Poison']
    }

// //Starting from 0, the loop references the pokemonList and sorts the data according to size.
// for (let i = 0; i < pokemonList.length; i++){ 
// //each Pokemon bigger than 2 meters are recognized as big
//     if (pokemonList[i].height >= 2) {
//         document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!</li>`)
// //ever other pokemon (i.e., the smaller ones) are categorized.
//     } else {
//         document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height})</li>`)
//     }
// }

pokemonList.forEach(function(pokemon) {
    document.write('pokemonList.name ' + '(' + 'height:' + ' pokemonList.height')
});