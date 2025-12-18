import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {useQuery} from "@tanstack/react-query";
import {getSearchMulti, IGetSearchMultiResult} from "../../api";
import loadingSvg from "../../assets/loading.svg";
import {makeImagePath} from "../../utilities";
import {AnimatePresence, motion, Variants} from "framer-motion";


const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    gap: 10px;
    margin-top: 100px;
    padding: 0 60px;
    flex-wrap: wrap;
`;

const Loading = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: url(${loadingSvg}) no-repeat center;
    background-size: 50px 50px;
`;

const Movie = styled(motion.div)<{$bgPhoto:string}>`
    width: 200px;
    height: 300px;
    cursor: pointer;
    background: url(${props => props.$bgPhoto});
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const movieVariants :Variants = {
    normal: {
        scale:1
    },
    hover: {
        scale: 1.3,
        transition: {
            type: "tween",
            delay: 0.3
        },
    }
}

const Info = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    top: 100%;
    background-color: #141414;
    opacity: 0;
    padding: 10px;
    cursor: auto;
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

const InfoTop = styled.div`
    color: #888;
    font-size: 12px;
`;

const InfoBottom = styled.div`
    color: ${props => props.theme.white.lighter};
    font-size: 12px;
`;

function Search (){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const {data, isLoading} = useQuery<IGetSearchMultiResult>({queryKey: ["search", "multi", keyword], queryFn: () => getSearchMulti(keyword!)})
    return (
        <>{isLoading ?
            <Loading/> :
            <Wrapper>
                <AnimatePresence>
                    {data?.results.map((movie) =>
                    <Movie key={movie.id}
                           $bgPhoto={makeImagePath(movie.poster_path, "w200")}
                           variants={movieVariants}
                           initial="normal"
                           whileHover="hover"
                    >
                        <Info variants={infoVariants}>
                            <InfoTop>{movie.release_date?.substring(0, 4)}</InfoTop>
                            <InfoBottom>{movie.title}</InfoBottom>
                        </Info>
                    </Movie>)}
                </AnimatePresence>
            </Wrapper>
        }</>
    );
}

export default Search;