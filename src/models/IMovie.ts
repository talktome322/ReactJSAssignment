export default interface Movie {
    actors: Array<String>
    averageRating: number
    contentRating: String
    duration: String
    genres: Array<String>
    id: String
    imdbRating: number
    originalTitle: String
    poster: String
    posterurl: String
    ratings: Array<number>
    releaseDate: String
    storyline: String
    title: String
    year: String
    favourite?: Boolean
}