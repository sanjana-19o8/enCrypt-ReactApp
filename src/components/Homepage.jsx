import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link, Route} from 'react-router-dom';

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News} from "./index";


const Homepage = () => {
    const { data, error, isLoading } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if(isLoading) return 'Loading... ';

    return (
        <>
        <Typography.Title level={2} className="heading" >Global Crypto Stats</Typography.Title>
        <Row>
            <Col span={12}><Statistic title="Total Cryptocurrenices" value={error?'err' : globalStats.total} /></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={error?'err' : millify(globalStats.totalExchanges)} /></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={error?'err' : millify(globalStats.totalMarketCap)} /></Col>
            <Col span={12}><Statistic title="Total 24h Volume" value={error?'err' : millify(globalStats.total24hVolume)} /></Col>
            <Col span={12}><Statistic title="Total Markets" value={error?'err' : millify(globalStats.totalMarkets)} /></Col>
        </Row>
        <div className="home-heading-container">
            <Typography.Title level={2} className="home-title">Top 10 Cryptocurrencies</Typography.Title>
            <Typography.Title level={3} className="show-more"><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
        </div>
        <Cryptocurrencies simplified={true} />
        <div className="home-heading-container">
            <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
            <Typography.Title level={3} className="show-more"><Link to='/news'>Goto Newsfeed</Link></Typography.Title>
        </div>
        <News simplified={true}/>
        </>
    )
}

export default Homepage;