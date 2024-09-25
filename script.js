document.getElementById('pokemonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        return response.json();
      })
      .then(data => {
        const ability = data.abilities.map(abilityInfo=> abilityInfo.ability.name).join(', ')
        pokemonInfoDiv.innerHTML = `
          <h2>${data.name.toUpperCase()}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p>ID: ${data.id}</p>
          <p>Altura: ${data.height / 10} m</p>
          <p>Peso: ${data.weight / 10} kg</p>
          <p>Habilidad: ${ability}</p>
        `;
      })
      .catch(error => {
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
      });
  });
  