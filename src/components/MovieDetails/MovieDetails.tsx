import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getMovies } from '../../services/api';
import './movieDetails.css'
import { faClose, faEye, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faRotateBack, faRotateForward } from "@fortawesome/free-solid-svg-icons";
import Movie from '../../models/IMovie';

type Props = {}

const MovieDetails = (props: Props) => {
  const { category, name } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [modalState, setModalState] = useState<boolean>(false);
  useEffect(() => {
    getMovies(`${category}?title=${name}`).then(resp => {
      setMovie(resp[0]);
    })
  }, [category, name])
  return (
    <div className='movie-details-container'>
      <div className='navbar'>
        <Link to={'/'}> Back to home</Link>
      </div>
      {modalState && <div className='modal'>
          <div className='modal-close-icon'>
            <FontAwesomeIcon className='faicon' onClick={() => { zoomScale < 2.5 && setZoomScale(zoomScale + 0.1) }} icon={faMagnifyingGlassPlus}/>
            <FontAwesomeIcon className='faicon' onClick={() => { zoomScale > 0.2 && setZoomScale(zoomScale - 0.1) }} icon={faMagnifyingGlassMinus}/>
            <FontAwesomeIcon className='faicon' onClick={() => setRotation(rotation + 90)} icon={faRotateForward}/>
            <FontAwesomeIcon className='faicon' onClick={() => setRotation(rotation - 90)} icon={faRotateBack}/>
            <FontAwesomeIcon className='faicon' onClick={() => setModalState(false)} icon={faClose}/>
          </div>
          <img alt="" style={{ transition: 'all 0.5s ease', transform: `rotate(${rotation}deg) scale(${zoomScale})` }} src={require(`../../resources/img/${movie?.poster || 'film-poster-placeholder.jpeg'}`)}></img>
        </div>}
      {movie && <div className='movie-details'>
          <div onClick={() => setModalState(true)} className='image-container'>
            <img alt="" src={require(`../../resources/img/${movie.poster || 'film-poster-placeholder.jpeg'}`)}></img>
            <div className="after">Preview <FontAwesomeIcon className='previewIcon' onClick={() => setModalState(false)} icon={faEye}/></div>
          </div>
          <div className='facts-container'>
              <h4>{movie.title} ({movie.year})</h4>
              <div className='facts'>
                <span className='label'>IMDB</span> <span className='data' >{movie.imdbRating || 'NA'}</span>
                <span className='label'>Content Rating</span> <span className='data'>{movie.contentRating || 'NA'}</span>
                <span className='label'>Average Rating</span> <span className='data'>{movie.averageRating || 'NA'}</span>
                <span className='label'>Duration</span> <span className='data'>{movie.duration || 'NA'}</span>
                <span className='label'>Genres</span> <span className='data'>{movie.genres?.join(', ') || 'NA'}</span>
                <span className='label'>Actors</span> <span className='data'>{movie.actors?.join(', ') || 'NA'}</span>
                <span className='label'>Release Date</span> <span className='data'>{movie.releaseDate || 'NA'}</span>
                <span className='label'>Story Line</span> <span className='data'>{movie.storyline || 'NA'}</span>
              </div>
          </div>
      </div>}
    </div>
  )
}

export default MovieDetails