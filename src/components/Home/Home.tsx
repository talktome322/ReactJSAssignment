import { faClose, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Key, useCallback, useEffect, useState } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';

import { addFavorites, deleteFavorites, getMovies } from "../../services/api";
import Menu from "../commons/Menu";
import './home.css';
import Movie from "../../models/IMovie";
import ToastObj from "../../models/IToast";


function Home() {
  const [currentMovies, setCurrentMovies] = useState<Array<Movie>>([]);
  const [moviesToShow, setMoviesToShow] = useState<Array<Movie>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<String>('movies-in-theaters');
  const [messages, setMessages] = useState<Array<ToastObj>>([])

  const refreshMovies = useCallback(() => {
    getMovies(activeTab).then((resp: Array<Movie>) => {
      setCurrentMovies(resp);
      setMoviesToShow(resp);
      setLoading(false);
    })
  }, [activeTab])

  useEffect(() => {
    refreshMovies()
  }, [activeTab, refreshMovies])

  const setMessagesWithTimeout = (data: ToastObj) => {
    setMessages((prevState) => [...prevState, data]);
    setTimeout(() => {
      setMessages((prevState) => prevState.filter((x) => x.id !== data.id))
    }, 3000)
  }

  useEffect(() => {
    setMoviesToShow(currentMovies.filter(x => x.title.toLowerCase().includes(search.toLowerCase())));
  }, [currentMovies, search])

  const setFavorite = (movie: Movie) => {
    setLoading(true);
    addFavorites({...movie, favourite: true, id: `${activeTab}-${movie.title}`}).then(x => {
      setLoading(false);
      setMessagesWithTimeout({ id: Date.now(), show: true, type: 'Success', detail: 'Successfully Added to Favorite'});
    }).catch(e => {
      const err = `${e.response.data.substring(0,34)}...`
        setLoading(false);
        setMessagesWithTimeout({ id: Date.now(), show: true, type: 'Error', detail: `${err.includes('duplicate id') ? 'Movie Already Favorited' : err}`});
    });
  }

  const deleteFavorite = (movie: Movie) => {
    setLoading(true);
    const id = activeTab === 'favourit' ? movie.id : `${activeTab}-${movie.title}`
    deleteFavorites(id).then(x => {
      setLoading(false);
      activeTab === 'favourit' && refreshMovies()
      setMessagesWithTimeout({ id: Date.now(), show: true, type: 'Success', detail: 'Successfully Removed from Favorite'});
    }).catch(e => {
        const err = `${e.response.data.substring(0,34)}...`
        setLoading(false);
        setMessagesWithTimeout({ id: Date.now(), show: true, type: 'Error', detail: err});
    });
  }
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer className="toast-container" position="top-end">
        {messages.reverse().map(msg => <Toast className={`toast-${msg.type.toLowerCase()}`} show={true}>
            <Toast.Header>
              <strong >{msg.type}</strong>
            </Toast.Header>
            <Toast.Body>{msg.detail}</Toast.Body>
        </Toast>)}
      </ToastContainer>
      <Menu search={search} onLinkClick={(activeTab: String) => { 
                setActiveTab(activeTab)
                setSearch('')
            }} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
      <h4 className="title">Movies</h4>
      <div className="container">
        {moviesToShow.length > 0 ? moviesToShow.map(movie => <div onClick={() => navigate(`/${activeTab}/${movie.title}`)} key={movie.id as Key} className="movie-container">
          <img alt="" src={require(`../../resources/img/${movie.poster || 'film-poster-placeholder.jpeg'}`)}></img>
          <p className="center">{movie.title}</p>
          <Button disabled={loading} className="center" onClick={(e) => {
              e.stopPropagation();
              activeTab === 'favourit' ? deleteFavorite(movie) : setFavorite(movie);
            }}>{activeTab === 'favourit' ? <>Remove Favourite <FontAwesomeIcon className={'icon'} color={'red'} icon={faClose}/></> : <>Add To Favourites<FontAwesomeIcon className={'icon'} color={'red'} icon={faHeart}/></> }</Button>
          </div>) : <span>No Data To Show</span>}
      </div>
    </>
  );
}

export default Home;
