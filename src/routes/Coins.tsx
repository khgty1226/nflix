import styled from "styled-components";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchCoins} from "./api";
import Helmet from "react-helmet"
import {useSetRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul`
`;

const Coin = styled.li`
    background-color: ${props => props.theme.cardBgColor};
    color: ${props => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid white;
    a {
        display: flex;
        transition: color .2s ease-in;
        padding: 20px;
        align-items: center;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
    display: block;
    text-align: center;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank:number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

interface ICoinsProps {
}

export function Coins (){
    const { isLoading, data } = useQuery<ICoin[]>({ queryKey: ['allCoins'], queryFn: fetchCoins })
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    return <Container>
        <Helmet>
            <title>코인</title>
        </Helmet>
        <Header>
            <Title>코인</Title>
            <button onClick={toggleDarkAtom}>Toggle Dark Mode</button>
        </Header>
        {isLoading ? <Loader>Loading...</Loader> :(
            <CoinList>
                {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                    <Link to={{
                        pathname: `/${coin.id}`,
                        state: {name: coin.name}
                    }}>
                            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                            {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinList>
        )}
    </Container>;
}

export default Coins;