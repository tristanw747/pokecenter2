import React from 'react'
import useFetch from '../../hooks/useFetch'
import baseUrl from '../../data/baseUrl'

function Card({pokemonID}) {
  const { data, loading, error } = useFetch(baseUrl.base +"/"+ pokemonID)
  return (
    <div>{data?.name}</div>
  )
}

export default Card