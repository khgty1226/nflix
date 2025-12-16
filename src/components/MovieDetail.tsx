import styled from "styled-components";
import {motion} from "framer-motion";
import {makeImagePath} from "../utilities";
import {getMovieDetail, IGetMovieDetail, IMovie} from "../api";
import React from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

const Wrapper = styled(motion.div)`
    position: absolute;
    width: 60vw;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${props => props.theme.black.lighter};
    border-radius: 15px;
    overflow: hidden;
`;

const Head = styled.div<{backdropPath:string}>`
    position: relative;
    width: 100%;
    height: 450px;
    background-image: linear-gradient(to top, black, transparent), url(${props => makeImagePath(props.backdropPath, "w500")});
    background-size: cover;
    background-position: center center;
`;

const Body = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    width: 100%;
    padding: 20px;
    background: #181818 linear-gradient(to bottom, black, transparent);
`;

const BodyLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const BodyRight = styled.div`
    display: flex;
    flex-direction: column;
    gap:20px
`;

const Title = styled.h3`
    color: ${props => props.theme.white.lighter};
    font-size: 32px;
    position: absolute;
    padding: 20px;
    bottom: 0;
`;

const OverView = styled.p`
    position: relative;
    color: ${props => props.theme.white.lighter};
    line-height: 20px;
`;

const Close = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 999px;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    svg {
        width: 18px;
        height: 18px;
    }
`;

const Info = styled.div`
    display: flex;
    gap: 10px;
`;

const Genres = styled.div`
    span:first-child {
        color: #888;
        font-weight: 500;
    }
    span:last-child {
        color: ${props => props.theme.white.lighter}
    }
`;

const Companies = styled.div`
    span:first-child {
        color: #888;
        font-weight: 500;
    }
    span:last-child {
        color: ${props => props.theme.white.lighter}
    }
`;

const Countries = styled.div`
    span:first-child {
        color: #888;
        font-weight: 500;
    }
    span:last-child {
        color: ${props => props.theme.white.lighter}
    }
`;

interface IMovieDetailProps {
    clickedMovieData: IMovie;
    layoutId: string;
}

function MovieDetail({layoutId, clickedMovieData}:IMovieDetailProps){
    const history = useHistory();
    const onWrapperClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }
    const { data:movieDetailData, isLoading} = useQuery<IGetMovieDetail>({queryKey:["movies", "detail"], queryFn: () => getMovieDetail(clickedMovieData.id+"")})
    return (
        <Wrapper layoutId={layoutId} onClick={onWrapperClick}>
            <Close onClick={()=> history.push("/")}>
                <svg viewBox="0 0 24 24" width="24" height="24" data-icon="XMedium" data-icon-id=":r9s:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="currentColor" fillRule="evenodd" d="M10.586 12 2.293 3.707l1.414-1.414L12 10.586l8.293-8.293 1.414 1.414L13.414 12l8.293 8.293-1.414 1.414L12 13.414l-8.293 8.293-1.414-1.414z" clipRule="evenodd"></path></svg>
            </Close>
            <Head backdropPath={clickedMovieData.backdrop_path}>
                <Title>{clickedMovieData.title}</Title>
            </Head>
            <Body>
                { movieDetailData &&
                    <>
                        <BodyLeft>
                            <Info>
                                <span>{movieDetailData?.release_date.substring(0, 4)}</span>
                                <span>{Math.floor(movieDetailData?.runtime / 60)}시간 {movieDetailData?.runtime % 60}분</span>
                            </Info>
                            <OverView>{clickedMovieData.overview}</OverView>
                        </BodyLeft>
                        <BodyRight>
                            <Genres><span>장르: </span><span>{movieDetailData.genres.map((genre, i, genres) => (i === genres.length - 1) ? genre.name : genre.name + ", " )}</span></Genres>
                            <Companies><span>회사: </span><span>{movieDetailData.production_companies.map((company, i, companies) => (i === companies.length - 1) ? company.name : company.name + ", ")}</span></Companies>
                            <Countries><span>국가: </span><span>{movieDetailData.production_countries.map((country, i, countries) => (i === countries.length - 1) ? country.name : country.name + ", " )}</span></Countries>
                        </BodyRight>
                    </>
                }
            </Body>
        </Wrapper>
    );
}

export default MovieDetail;