import React, { useState, useEffect, ReactDOM } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getPokemon, getAllPokemon } from './services/pokemon';
import './App.css';
import myimage from './my-image.gif'


function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }
  
  return (
    <>
      <Navbar />
      <div className="about-me">
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div  className = "nes-container is-rounded" id = "conteiner">
                <div>
                  <p id = "firstP">Bienvenido a Pokedex!! <br></br>Esta es una api donde obtienes
                  <br></br>todos los datos sobre todos los pokemons!</p>
                </div>
                <div id = 'hello'>
                  <p className = "animate__slideInLeft">Hello World!!</p>
                </div>
                <div>
                  <img src = {myimage} className = "nes-container is-rounded" id = "photo"></img>
                </div>
              
                <div id = "conteinerTwo">
                <button >Click Aqui</button>
                </div>
            </div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
