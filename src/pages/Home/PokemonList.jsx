import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Body from '../../components/Body/Body';
import Loading from '../../components/Loading/Loading';
import Generation from '../Generation/Generation';
import { useState, useEffect } from 'react';

function PokemonList({ e }) {
  const [pokeNameState, setPokeNameState] = useState(false)
  let [pokeTotalState, setPokeTotalState] = useState([])
  const toggleModal = () => {
    setPokeNameState(!pokeNameState);
  };

  useEffect(() => {
    pokeNameState
      ? document.body.classList.add('active-modal')
      : document.body.classList.remove('active-modal')
  }, [pokeNameState])

 


  let { data, loading, error } = useFetch(e.url)
  // useEffect((data) => {
  //   setPokeTotalState(prevState => [...prevState, data?.name])
  // }, [data])
  // if (loading) return <span></span>
  if (!data || loading) { return null }
  // if(!data || loading) {return <Loading/>}
  if (error) console.log(error)





  const pokemonObj = {
    id: "#" + data?.id,
    name: data?.name,
    type: [data?.types[0]?.type.name, data?.types[1]?.type.name],
    height: data?.height,
    weight: data?.weight,
    abilities: data?.abilities.map(e => { return e.ability.name }),
    stats: {
      hp: data?.stats[0].base_stat,
      attack: data?.stats[1].base_stat,
      defense: data?.stats[2].base_stat,
      special_attack: data?.stats[3].base_stat,
      special_defense: data?.stats[4].base_stat,
      speed: data?.stats[5].base_stat,
      // total: this?.hp + this?.attack + this?.defense + this?.special_attack + this?.special_defense + this?.speed
    }
  }

  // console.log(pokemonObj.abilities)
  // console.log(typeof pokemonObj.stats.hp)
  return (
    <>
      <div className={`card-container type-${pokemonObj.type[0]}`} onClick={toggleModal}>
        {data?.sprites?.other.dream_world?.front_default ?
          <img className="pokemon-img" src={data?.sprites?.other?.dream_world?.front_default} alt={`${pokemonObj.name}`} /> :
          <img className="pokemon-img" src={data?.sprites?.other['official-artwork'].front_default} alt={`${pokemonObj.name}`} style={{ width: "150px", height: "150px", margin: "10px 10px" }} />
        }
        <div className="pokemon-id" >  {pokemonObj.id}</div>
        <div className="pokemon-name" > {pokemonObj.name} </div>
        <div className="pokemon-ball"></div>
        <div className="pokemon-type"> {pokemonObj.type[0]} </div>
        {pokemonObj.type[1] && <div className="pokemon-type">{pokemonObj.type[1]}</div>}
      </div>
      {pokeNameState && (
        <div className="modal-container">
          <div onClick={toggleModal} className="modal-transparent-back" ></div>
          <div className="modal-content">
            <div className={`card-modal-container type-${pokemonObj.type[0]}`}>
              {data?.sprites?.other.dream_world?.front_default ?
                <img className="modal-pokemon-img" src={data?.sprites?.other?.dream_world?.front_default} alt={`${pokemonObj.name}`} /> :
                <img className="modal-pokemon-img" src={data?.sprites?.other['official-artwork'].front_default} alt={`${pokemonObj.name}`} style={{ width: "250px", height: "250px", margin: "10px 10px" }} />
              }

              <div className="modal-pokemon-id" >  {pokemonObj.id}</div>
              <div className="modal-pokemon-name" > {pokemonObj.name} </div>
              <div className="modal-pokemon-ball"></div>
              <div className="modal-type-container">
                <div className="modal-pokemon-type"> {pokemonObj.type[0]} </div>
                {pokemonObj.type[1] && <div className="modal-pokemon-type-2">{pokemonObj.type[1]}</div>}
              </div>
              <div className="modal-specs-container">
                <table>
                  <tbody>
                    <tr>
                      <td>Type:</td>
                      <td> {pokemonObj.type[1] ? pokemonObj.type.join(', ') : pokemonObj.type[0]}</td>
                    </tr>
                    <tr>
                      <td>Height:</td>
                      <td> {pokemonObj.height}0cm</td>
                    </tr>
                    <tr>
                      <td>Weight:</td>
                      <td>{pokemonObj.weight / 10}kg</td>
                    </tr>
                    <tr>
                      <td>Abilities:</td>
                      <td>{pokemonObj.abilities.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="modal-spec-type"><span>Type:</span> {pokemonObj.type[1] ? pokemonObj.type.join(', '): pokemonObj.type[0]}</div> */}
                {/* <div className="modal-spec-height"><span>Height:</span> {pokemonObj.height}</div>
                <div className="modal-spec-weight"><span>Weight: </span>{pokemonObj.weight}</div> */}
                {/* <div className="modal-spec-abilties"><span>Abilties:</span> {pokemonObj.abilities.join(', ')}</div> */}
              </div>

              <div className="modal-stats-container ">
                <table>
                  <tbody>
                    <tr>
                      <td>HP</td>
                      <td>{pokemonObj.stats.hp}</td>
                      <td ><div className='prog-bar-1' style={{ background: `linear-gradient(to right, #00a80b ${pokemonObj.stats.hp / 150 * 100}%,  #e0e0e0 0% )` }} ></div></td>
                    </tr>
                    <tr>
                      <td>Attack</td>
                      <td>{pokemonObj.stats.attack}</td>
                      <td ><div className='prog-bar-1' style={{ background: `linear-gradient(to right, #00a80b ${pokemonObj.stats.attack / 150 * 100}%,  #e0e0e0 0% )` }} ></div></td>
                    </tr>
                    <tr>
                      <td>Defense</td>
                      <td>{pokemonObj.stats.defense}</td>
                      <td ><div className='prog-bar-1' style={{ background: `linear-gradient(to right, #00a80b ${pokemonObj.stats.defense / 150 * 100}%,  #e0e0e0 0% )` }} ></div></td>
                    </tr>
                    <tr>
                      <td>Sp. Atk</td>
                      <td>{pokemonObj.stats.special_attack}</td>
                      <td ><div className='prog-bar-1' style={{ background: `linear-gradient(to right, #00a80b ${pokemonObj.stats.special_attack / 150 * 100}%,  #e0e0e0 0% )` }} ></div></td>
                    </tr>
                    <tr>
                      <td>Sp. Def</td>
                      <td>{pokemonObj.stats.special_defense}</td>
                      <td ><div className='prog-bar-1' style={{ background: `linear-gradient(to right, #00a80b ${pokemonObj.stats.special_defense / 150 * 100}%,  #e0e0e0 0% )` }} ></div></td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td>{pokemonObj.stats.speed}</td>
                      <td ><div className='prog-bar-1' style={{ background: `linear-gradient(to right, #00a80b ${pokemonObj.stats.speed / 150 * 100}%,  #e0e0e0 0% )` }} ></div></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
      }
















    </>
  )
}

export default PokemonList