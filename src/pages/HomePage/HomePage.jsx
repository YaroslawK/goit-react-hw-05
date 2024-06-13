import MoviesList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css'

const HomePage = ({movies}) => {
    
    return <>
        <h1 className={css.homePageTitle}>Trending today</h1>
        <MoviesList movies={movies}/>
    </>
}

export default HomePage;