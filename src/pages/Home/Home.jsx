import React, { useState } from 'react';
import './Home.scss';
// import useFetch from '../../hooks/useFetch';
// import PokemonList from './PokemonList';
import baseUrl from '../../data/baseUrl';
import Body from '../../components/Body/Body';
import generations from '../../data/generations';

function Home() {
  const [gen, setGen] = useState(generations[0].link)


  return (
    <Body gen={gen}  />
  )

}

export default Home