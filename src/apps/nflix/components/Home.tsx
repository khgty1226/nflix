import {useQuery} from "@tanstack/react-query";
import styled from "styled-components";
import {getMovies, IGetMoviesResult} from "../../../api";
import {makeImagePath} from "../../../utilities";
import {AnimatePresence, motion, Variants} from "framer-motion";
import {useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";

const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 18px;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap:5px;
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{$bgPhoto:string}>`
    background-color: white;
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center;
    height: 200px;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const rowVariants = {
    hidden: {
        x: window.innerWidth
    },
    visible: {
        x: 0
    },
    exiting: {
        x: -window.innerWidth
    }
}

const boxVariants: Variants = {
    normal: {
        scale: 1
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            type: "tween",
            delay: 0.3
        },
    }
}

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const infoVariants: Variants = {
    hover: {
        opacity: 1,
        transition: {
            type: "tween",
            delay: 0.3
        }
    }
}

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    overflow-y: scroll;
`;

const BigMovie = styled(motion.div)`
    position: absolute;
    width: 60vw;
    top: 20px;
    left: 0;
    right: 0;
    height: 1000px;
    margin: 0 auto;
    background-color: ${props => props.theme.black.lighter};
    border-radius: 15px;
    overflow: hidden;
`;

const BigCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
`;

const BigTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    font-size: 32px;
    position: relative;
    top: -80px;
    padding: 20px;
`;

const BigOverView = styled.p`
    position: relative;
    padding: 20px;
    top: -60px;
    color: ${props => props.theme.white.lighter};
`;

const offset = 6;

function Home() {
    const history = useHistory()
    const routeMatch = useRouteMatch();
    const contextPath = "/" + routeMatch.path.split("/")[1];
    const bigMovieMatch = useRouteMatch<{movieId:string}>(`${contextPath}/movies/:movieId`);
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        {queryKey:["movies","nowPlaying"],
            queryFn:getMovies}
    );
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length -1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    }
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId:number) => {
        history.push(`${contextPath}/movies/${movieId}`);
    }
    const onOverlayClick = () => {
        history.push(`${contextPath}`);
    }
    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row key={index}
                                 variants={rowVariants}
                                 initial="hidden"
                                 animate="visible"
                                 exit="exiting"
                                 transition={{type: "tween", duration: 1}}
                            >
                                {data?.results.slice(1).slice(offset*index, offset*index+offset).map(movie =>
                                    <Box
                                        key={movie.id}
                                        layoutId={movie.id+""}
                                        variants={boxVariants}
                                        $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                        initial="normal"
                                        whileHover="hover"
                                        transition={{type: "tween"}}
                                        onClick={()=> onBoxClicked(movie.id)}
                                    >
                                        <Info variants={infoVariants}>
                                            <h4>{movie.title}</h4>
                                        </Info>
                                    </Box>)
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay onClick={onOverlayClick} animate={{opacity:1}} exit={{opacity:0}}>
                                    <BigMovie
                                        layoutId={bigMovieMatch.params.movieId}>
                                        {clickedMovie &&
                                            <>
                                                <BigCover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`}} />
                                                <BigTitle>{clickedMovie.title}</BigTitle>
                                                <BigOverView>{clickedMovie.overview}</BigOverView>
                                            </>}
                                    </BigMovie>
                                </Overlay>
                            </>
                        ): null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}
export default Home;