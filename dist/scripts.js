let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?t.push(e):console.log("pokemon is not correct")}function i(){return t}let n=document.querySelector("#modal-container");function a(){n.classList.remove("is-visible")}return window.addEventListener("keydown",t=>{let e=document.querySelector("#modal-container");"Escape"===t.key&&e.classList.contains("is-visible")&&a()}),n.addEventListener("click",t=>{t.target===n&&a()}),{add:e,getAll:i,addListItem:function t(e){let i=document.querySelector(".pokemon-list"),a=document.createElement("li"),o=document.createElement("button");o.innerText=e.name,o.classList.add("pkbutton","btn","btn-primary"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#modal-container"),a.classList.add("list-group-item","mt-3"),i.appendChild(a),a.appendChild(o),o.addEventListener("click",()=>{(function t(e){var i;fetch((i=e).detailsUrl).then(function(t){return t.json()}).then(function(t){console.log(t),i.image=t.sprites.front_default,i.height=t.height,i.weight=t.weight,i.types=t.types,i.abilities=t.abilities}).catch(function(t){console.error(t)}).then(function(){var t;let i,a,o,l,s,p,r,c,d,m;t=e,i=$(".modal-body"),a=$(".modal-title"),$(".modal-header"),a.empty(),i.empty(),o=$("<h1>"+t.name+"<h1>"),(l=$('<img class="modal-img" style="width:120%">')).attr("src",t.image),s=$("<p>Height : "+t.height+"</p>"),p=$("<p>Weight : "+t.weight+"</p>"),1===t.types.length?r=t.types[0].type.name:2===t.types.length&&(r=t.types[0].type.name+", "+t.types[1].type.name),c=$("<p>Types: "+r+"</p>"),1===t.abilities.length?d=t.abilities[0].ability.name:2===t.abilities.length&&(d=t.abilities[0].ability.name+", "+t.abilities[1].ability.name),m=$("<p>Abilities : "+d+"</p>"),n.append(i),a.append(o),i.append(l),i.append(s),i.append(p),i.append(c),i.append(m),console.log(e)})})(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});