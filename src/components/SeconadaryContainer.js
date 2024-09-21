import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SeconadaryContainer = () => {
  const movies = useSelector(store=>store.movies)

  return  (
    movies.nowPlayingMovies &&
    (<div className="bg-black">
    <div className="-mt-78 pl-12 relative z-20">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"trending"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
      </div>

    </div>
    )
  )
}

export default SeconadaryContainer
