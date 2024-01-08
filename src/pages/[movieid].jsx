import React, { useEffect, useState } from 'react'

const MoviePage = ({ movieid }) => {
    const [movieData, setMovieData] = useState({})
    useEffect(() => {
        let url = `https://www.omdbapi.com/?i=${movieid}&apikey=82279c68`;

        let options = {
            method: 'GET',
            headers: { Accept: '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.com)' }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                //if (json.Response === 'False') return alert("Movie not found");
                console.log(json)
                setMovieData(json)
            })
            .catch(err => console.error('error:' + err));
    }, [])

    return (

        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            {movieData && (
                <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-lg">
                    <img src={movieData.Poster} alt="Movie Poster" className="w-full mb-4 rounded" />
                    <h2 className="text-2xl font-bold mb-2">
                        {movieData.Title} ({movieData.Year})
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Rated: {movieData.Rated} | Released: {movieData.Released} | Runtime: {movieData.Runtime}
                    </p>
                    <p className="text-gray-800 mb-4">Genre: {movieData.Genre}</p>
                    <p className="text-gray-800 mb-4">Director: {movieData.Director}</p>
                    <p className="text-gray-800 mb-4">Writer: {movieData.Writer}</p>
                    <p className="text-gray-800 mb-4">Actors: {movieData.Actors}</p>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h3 className="text-xl font-bold mb-2">Plot</h3>
                        <p className="text-gray-800">{movieData.Plot}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h3 className="text-xl font-bold mb-2">Ratings</h3>
                        <ul>
                            {movieData.Ratings?.map((rating, index) => (
                                <li key={index}>
                                    <strong>{rating.Source}:</strong> {rating.Value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h3 className="text-xl font-bold mb-2">Additional Information</h3>
                        <p className="text-gray-800">
                            <strong>Language:</strong> {movieData.Language}
                        </p>
                        <p className="text-gray-800">
                            <strong>Country:</strong> {movieData.Country}
                        </p>
                        <p className="text-gray-800">
                            <strong>Awards:</strong> {movieData.Awards}
                        </p>
                    </div>
                </div>
            )}
        </div>

    )
}

export async function getServerSideProps(context) {
    try {
        //console.log(context.query);
        const { movieid } = context.query;
        return { props: { movieid: movieid } };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return { props: { movieid: null } };
    }
}

export default MoviePage