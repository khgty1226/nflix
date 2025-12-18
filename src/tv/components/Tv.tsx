import {useQuery} from "@tanstack/react-query";
import styled from "styled-components";
import {getTvAiringToday, IGetTvSeriesResult} from "../../api";
import {makeImagePath} from "../../utilities";
import {AnimatePresence, motion, Variants} from "framer-motion";
import React, {useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import TvDetail from "./TvDetail";

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

const LeftArrow = styled.div`
    display: none;
    position: absolute;
    left: 0;
    width: 50px;
    height: 200px;
    justify-content: center;
    align-items: center;
    z-index: 1;
    font-size: 36px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const RightArrow = styled.div`
    display: none;
    position: absolute;
    width: 50px;
    height: 200px;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 1;
    font-size: 36px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
    &:hover ${LeftArrow},
    &:hover ${RightArrow} {
        display: flex;
    }
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
    hidden: (back:number) => ({
        x: back ? -window.innerWidth : window.innerWidth,
    }),
    visible: {
        x: 0
    },
    exiting: (back: number) => ({
        x: back ? window.innerWidth : -window.innerWidth,
    }),
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
    background: ${props => props.theme.black.darker} linear-gradient(to bottom, black, transparent);
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 14px;
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

const offset = 6;

function Tv() {
    const history = useHistory()
    const bigTvMatch = useRouteMatch<{tvId:string}>(`/tv/:tvId`);
    const { data, isLoading } = useQuery<IGetTvSeriesResult>(
        {queryKey:["tv","airing_today"],
            queryFn:getTvAiringToday}
    );
    const [index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            const totalLength = data.results.length -1;
            const maxIndex = Math.floor(totalLength / offset) - 1;
            setBack(false);
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    }
    const decreaseIndex = () => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            const totalLength = data.results.length -1;
            const maxIndex = Math.floor(totalLength / offset) - 1;
            setBack(true);
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
    }
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (tvId:number) => {
        history.push(`/tv/${tvId}`);
    }
    const onOverlayClick = () => {
        history.push("/tv");
    }
    const clickedTvData =
        bigTvMatch?.params.tvId &&
        data?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].name}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <LeftArrow onClick={decreaseIndex}>&lt;</LeftArrow>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={back}>
                            <Row key={index}
                                 variants={rowVariants}
                                 initial="hidden"
                                 animate="visible"
                                 exit="exiting"
                                 transition={{type: "tween", duration: 1}}
                                 custom={back}
                            >
                                {data?.results.slice(1).slice(offset*index, offset*index+offset).map(tv =>
                                    <Box
                                        key={tv.id}
                                        layoutId={tv.id+""}
                                        variants={boxVariants}
                                        $bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                                        initial="normal"
                                        whileHover="hover"
                                        transition={{type: "tween"}}
                                        onClick={()=> onBoxClicked(tv.id)}
                                    >
                                        <Info variants={infoVariants}>
                                            <h4>{tv.name}</h4>
                                        </Info>
                                    </Box>)
                                }
                            </Row>
                        </AnimatePresence>
                        <RightArrow onClick={increaseIndex}>&gt;</RightArrow>
                    </Slider>
                    <AnimatePresence>
                        {bigTvMatch ? (
                            <>
                                <Overlay onClick={onOverlayClick} animate={{opacity:1}} exit={{opacity:0}}>
                                    { clickedTvData &&
                                        <TvDetail
                                            layoutId={bigTvMatch.params.tvId}
                                            clickedTvData={clickedTvData} />}
                                </Overlay>
                            </>
                        ): null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}
export default Tv;