import React from 'react'
import useFetch from '../../hooks/useFetch'
import baseUrl from '../../data/baseUrl'
import PokemonList from '../../pages/Home/PokemonList'
import Loading from '../Loading/Loading'
function Body({ gen }) {



  const { data, loading, error } = useFetch(baseUrl.base + gen)
  // if (loading) return <h1> Loading...</h1>
  if (!data || loading) { return <Loading /> }
  if (error) console.log(error)
  const pokemonList = data?.results

  return (
    <div className='poke-container'>
      {
        //  Promise.all(
        pokemonList?.map((e) => {
          return (<PokemonList e={e} key={e.name} />)
          // return (<Loading/> )
        })
        // )
      }
    </div>
  )
}

export default Body