import React from 'react';
import { useQuery } from 'react-query'
import axios, { CancelToken } from 'axios'
import { ReactQueryDevtools } from 'react-query-devtools'
import './App.css';

function useApi(api) {
  return useQuery(
    api,
    async () => {
      return axios.get(`https://pokeapi.co/api/v2/${api}`).then(res => res.data.results)
    },
    {
      // refetchOnWindowFocus: false
      // staleTime: 5000
      cacheTime: 5000
    }
  )
}

function usePokemonSeach(pokemon) {
  return useQuery(
    pokemon,
    () => {
      const source = CancelToken.source()
      console.log(source)
      const promise = new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
          return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
              cancelToken: source.token
            })
        })
        .then(res => res.data)
      promise.cancel = () => {
        source.cancel('Query was cancelled')
      }
      return promise
    },
    {
      enabled: pokemon,
      retry: 0
    }
  )
}

function Count() {
  const queryInfo = useApi('pokemon')
  return <h3>You are looking at {queryInfo.data?.length} pokemons</h3>
}

function Berries() {
  const queryInfo = useApi('berry')
  return queryInfo.isLoading ? 'Loading...' : queryInfo.isError ? queryInfo.error.message : (
    <div className="App">
      {queryInfo.data.map(result => <div key={result.name}>{result.name}</div>)}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  );
}

function Pokemon() {
  const queryInfo = useApi('pokemon')
  return queryInfo.isLoading ? 'Loading...' : queryInfo.isError ? queryInfo.error.message : (
    <div className="App">
      {queryInfo.data.map(result => <div key={result.name}>{result.name}</div>)}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  );
}

function PokemonSearch({ pokemon  }) {
  const queryInfo = usePokemonSeach(pokemon)

  return queryInfo.isLoading ? "Loading..." : queryInfo.isError ? queryInfo.error.message : 
    queryInfo?.data?.sprites ? (
      <img src={queryInfo.data.sprites.front_default} />
    ) : null

}

function App() {
  const [show, toggle] = React.useState(true)
  const [pokemon, setPokemon] = React.useState('')

  return (
    <>
      <input value={pokemon} onChange={e => setPokemon(e.target.value)} />
      <button onClick={() => toggle(!show)}>Show</button>
      <PokemonSearch pokemon={pokemon} />
      {show ? <Pokemon /> : null}
      <ReactQueryDevtools />
      <hr />
      {false && <Berries />}
    </>
  )
}

export default App;
