import MovieCard from '@/components/MovieCard';
import React, { useState } from 'react'

const Index = () => {
  const [query, setQuery] = useState('');
  const [movieData, setMovieData] = useState([])

  const handleSearch = (e) => {
    setQuery(e.target.value);
  }

  const searchMovie = () => {
    //console.log(query);
    let url = `https://www.omdbapi.com/?s=${query}&apikey=82279c68`;

    let options = {
      method: 'GET',
      headers: { Accept: '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.com)' }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        if (json.Response === 'False') return alert("Movie not found");
        console.log(json)
        setMovieData(json.Search)
      })
      .catch(err => console.error('error:' + err));
  }

  return (
    <div className='bg-gray-200'>
      {/* search bar */}
      <div className='flex space-x-2 max-w-5xl mx-auto text-center justify-center py-14'>
        <input name="query" className='border border-gray-700' value={query} onChange={handleSearch} />
        <button className='border border-gray-500 shadow-md bg-blue-600 px-6 py-2 rounded-md text-white' onClick={searchMovie}>search</button>
      </div>
      {/* movie data */}
      <div className="grid grid-cols-4 gap-4 mt-10 max-w-7xl mx-auto" >
        {
          movieData.map((e, i) => {
            return <MovieCard key={i} data={e} />
          })
        }
      </div>
    </div>
  )
}

export default Index