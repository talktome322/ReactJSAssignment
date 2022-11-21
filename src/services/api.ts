import axios from "axios";
import Movie from "../models/IMovie";

// Use to get data from data.json via json server
const getMovies = (path : String) => {
    return axios.get(`http://localhost:5000/${path}`)
                .then(response => response.data)
}

// Use to get data from data.json via json server
const updateMovie = (id : String, category: String, data: Movie) => {
    return axios.put(`http://localhost:5000/${category}/${id}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.data)
}

// Use to get data from data.json via json server
const addFavorites = (data: Movie) => {
    return axios.post('http://localhost:5000/favourit', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.data)
}

// Use to get data from data.json via json server
const deleteFavorites = (id : String) => {
    return axios.delete(`http://localhost:5000/favourit/${id}`)
                .then(response => response.data)
}


export { getMovies, addFavorites, deleteFavorites, updateMovie }