import React, { useState } from "react";
import { useParams } from "react-router";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { Typography, Select, Row, Col } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from "@ant-design/icons";
import LineChart from './LineChart';

import { useGetCoinHistoryQuery, useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title, Text} = Typography;
const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y' ]

const CryptoDetails = () => {
    const { coinId} = useParams();
    const [ timeperiod, setTimeperiod] = useState('7d');
    const { data: coinData, isFetching} = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory, isLoading} = useGetCoinHistoryQuery({coinId, timeperiod});

    const coinDetails = coinData?.data?.coin;
    if(isFetching) return ('Loading...');

    const stats = [
        { title: 'Price to USD', value: `$ ${coinDetails.price && millify(coinDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${coinDetails['24hVolume'] && millify(coinDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coinDetails.marketCap && millify(coinDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(coinDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
      ];
    
      const genericStats = [
        { title: 'Number Of Markets', value: coinDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: coinDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: coinDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(coinDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(coinDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
      ];

    return (
        <>
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {coinDetails.name} ({coinDetails.symbol}) Price
                </Title>
                <p>
                    {coinDetails.name} live price in US Dollars. View value statistics, market cap, and supply
                </p>
                <Select 
                placeholder='Select a timeperiod' 
                defaultValue='7d' 
                onChange={(time) => {setTimeperiod(time)}} 
                className="select-timeperiod"
                >
                    {time.map((timeperiod) => <Select.Option key={timeperiod}>{timeperiod}</Select.Option>)}
                </Select>

                {!isLoading && <LineChart coinHistory={coinHistory} currentPrice={millify(coinDetails?.price)} coinName={coinDetails?.name} />}
                
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">{coinDetails.name} Value Statistics</Title>
                            <p>An overview showing the statistics of {coinDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                            <p>An overview showing the statistics of {coinDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">What is {coinDetails.name}?</Title>
                    {HTMLReactParser(coinDetails.description)}
                </Row>
                <Row className="coin-links">
                    {coinDetails?.links?.map(link => (
                        <Col className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">{link.type}</Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Col>
        </>
    )
}

export default CryptoDetails;