const pokemonTypes = [
  "Steel",
  "Water",
  "Bug",
  "Dragon",
  "Electric",
  "Ghost",
  "Fire",
  "Fairy",
  "Ice",
  "Fighting",
  "Normal",
  "Grass",
  "Psychic",
  "Rock",
  "Dark",
  "Ground",
  "Poison",
  "Flying",
];

const allPokemons = await fetch("https://server-api-pokemon.onrender.com")
  .then((res) => res.json())
  .then((pokemons) => pokemons);

const listPokemons = document.getElementById("list-pokemons");

let pokemonToRender = allPokemons;

pokemonToRender.map((pokemon) => {
  const item = `
    <li class="pokemon">
            <img src="https://img.pokemondb.net/artwork/large/${pokemon.name.toLowerCase()}.jpg" alt="">
            <div>
                <h3>
                    <span>00${pokemon.id}</span>
                    ${pokemon.name}
                </h3>
                <h4>Tipos:</h4>
                <ul>
                    ${pokemon.type.map(
                      (type) =>
                        `<li class="${type.toLowerCase()}">${type.toUpperCase()}</li>`
                    )}
                </ul>
            </div>  
          </li>
    `;
  listPokemons.insertAdjacentHTML("beforeend", item);

  //   console.log(pokemon.type);
});

const selectFilter = document.getElementById("filter-select");
pokemonTypes.forEach((type) => {
  const item = `
    <option value="${type}">${type}</option>
  `;
  selectFilter.insertAdjacentHTML("beforeend", item);
});

selectFilter.addEventListener("change", (e) => {
  const valueToFilter = e.target.value;
  listPokemons.textContent = "";

  if (valueToFilter) {
    const pokemonsFilterByType = allPokemons.filter((pk) => {
      return pk.type.includes(valueToFilter);
    });

    if (pokemonsFilterByType.length == 0) {
      listPokemons.innerHTML = "<h1>No se encontraron Pokemones!</h1>";
      return true;
    }
  } else {
    pokemonToRender = allPokemons;
  }

  pokemonToRender.map((pokemon) => {
    const item = `
      <li class="pokemon">
              <img src="https://img.pokemondb.net/artwork/large/${pokemon.name.toLowerCase()}.jpg" alt="">
              <div>
                  <h3>
                      <span>00${pokemon.id}</span>
                      ${pokemon.name}
                  </h3>
                  <h4>Tipos:</h4>
                  <ul>
                      ${pokemon.type.map(
                        (type) =>
                          `<li class="${type.toLowerCase()}">${type.toUpperCase()}</li>`
                      )}
                  </ul>
              </div>
            </li>
      `;
    listPokemons.insertAdjacentHTML("beforeend", item);
  });
});

const inputFilter = document.getElementById("filter-input");
