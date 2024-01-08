import Link from 'next/link'
import React from 'react'

const MovieCard = ({data}) => {
  return (
    <div className='mx-auto  overflow-hidden'>
        <Link href={`/${data.imdbID}`}>
            <div className='mx-auto rounded-md border border-gray-400 hover:shadow-lg w-auto overflow-hidden max-w-[300px] h-full bg-white'>
                
                <img src={data.Poster} />
            
            <div className='px-2 py-2'> 
                <div className='text-gray-700 font-semibold text-2xl text-wrap'>{data.Title} ({data.Year})</div>
                <div className='font-semibold text-gray-400'>{data.Type}</div>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default MovieCard