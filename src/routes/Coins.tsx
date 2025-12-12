import styled from "styled-components";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoins} from "./api";
import Helmet from "react-helmet"
import {useRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
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
    box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
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
    font-size: 32px;
    font-weight: 600;
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

const ThemeBtn = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${props => props.theme.cardBgColor};
    box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
    cursor: pointer;
    svg {
        width: 25px;
        height: 25px;
        fill: royalblue;
        path {
            stroke: royalblue;
        }
    }
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
    const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    return <Container>
        <Helmet>
            <title>Crypto-Tracker</title>
        </Helmet>
        <Header>
            <Title>Crypto-Tracker</Title>
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
        <ThemeBtn onClick={toggleDarkAtom}>{darkAtom ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
            </svg>

        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"/>
            </svg>
        )}</ThemeBtn>
    </Container>;
}

export default Coins;