const API_KEY = "09946b15f357c913b22bac631a2a7f80";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGetMovieDetail {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: any
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface Genre {
    id: number
    name: string
}

interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

interface ProductionCountry {
    iso_3166_1: string
    name: string
}

interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}


// Tv Series

export interface IGetTvSeriesResult {
    page: number
    results: ITvSeries[]
    total_pages: number
    total_results: number
}

export interface ITvSeries {
    backdrop_path: string
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}



export interface IGetTvDetailResult {
    adult: boolean
    backdrop_path: string
    created_by: CreatedBy[]
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: any
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export interface CreatedBy {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
}

export interface LastEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
}

export interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}


export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getMovieDetail(id:string){
    return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then(
        (response) => response.json()
    )
}

export function getTvAiringToday(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
        (response) => response.json()
    )
}

export function getTvDetail(id:string){
    return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then(
        (response) => response.json()
    )
}