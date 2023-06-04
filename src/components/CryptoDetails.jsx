import React, { useState } from "react";
import { useParams } from "react-router";
import millify from "millify";
import { Typography, Select, Row, Col } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from "@ant-design/icons";
import LineChart from './LineChart';

import { useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title, Text} = Typography;
const time = ['3hrs', '24hrs', '7days', '30days', '3months', '1yr', '3yrs', '5yrs' ]

const CryptoDetails = () => {
    const { coinId} = useParams();
    const [ timePeriod, setTimePeriod] = useState('7days');
    const { data, isFetching} = useGetCryptoDetailsQuery(coinId);

    const coinDetails = data?.data?.coin;

    const stats = [
        { title: 'Price to USD', value: `$ ${coinDetails.price && millify(coinDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${coinDetails.volume && millify(coinDetails.volume)}`, icon: <ThunderboltOutlined /> },
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
                defaultValue='7days' 
                onChange={(time) => {setTimePeriod(time)}} 
                className="select-timeperiod"
                >
                    {time.map((timePeriod) => <Select.Option key={timePeriod}>{timePeriod}</Select.Option>)}
                </Select>
                <LineChart></LineChart>
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">{coinDetails.name} Value Statistics</Title>
                            <p>An overview showing the statistics of {coinDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
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
                            <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-desc-link">
                    <Row className="coin-desc">
                        <Title level={3} className="coin-details-heading">What is {coinDetails.name}?</Title>
                        {coinDetails?.links?.map(link => (
                            <Row className="coin-link" key={link.name}>
                                <Title level={4} className="link-name">{link.name}</Title>
                                Visit <a href={link.url} target="_blank" rel="noreferrer">{link.type}</a>
                            </Row>
                        ))}
                    </Row>
                </Col>
            </Col>
        </Col>
        </>
    )
}

export default CryptoDetails;