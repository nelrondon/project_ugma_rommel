const pokemonTypes = [
  "steel",
  "water",
  "bug",
  "dragon",
  "electric",
  "ghost",
  "fire",
  "fairy",
  "ice",
  "fighting",
  "normal",
  "grass",
  "psychic",
  "rock",
  "dark",
  "ground",
  "poison",
  "flying",
];

const pokemons = await fetch("https://server-api-pokemon.onrender.com")
  .then((res) => res.json())
  .then((pokemons) => pokemons);

const listPokemons = document.getElementById("list-pokemons");

pokemons.map((pokemon) => {
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
