import React from "react";
import { useParams } from "react-router";
import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';
import { Chart } from "chart.js";

import { useGetCoinHistoryQuery } from "../services/cryptoApi";

const LineChart = ({ timePeriod, currentPrice, coinName}) => {
    const { coinId} = useParams();
    const { data: coinHistory, isFetching } = useGetCoinHistoryQuery({coinId, timePeriod});

    if(isFetching) return ('Loading...');
    
    const coinPrice = [];
    const coinTimeStamp = [];

    console.log(coinHistory)

    for(let i=0; i< coinHistory?.data?.history.length; i += 1){
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [{
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
            tension: 0,
        }]
    }
    const options = {
        scales: {
            yAxes:{
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    }

    console.log(data)
    Chart.register(Chart.LinearScale);
    Chart.register(Chart.CategoryScale);

    return (
        <>
        <Row className="chart-header">
            <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
            <Col className="price-container">
                <Typography.Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography.Title>
                <Typography.Title level={5} className="current-price">Current Price: {currentPrice}</Typography.Title>
            </Col>
        </Row>
        <Line data={data} options={options} />
        </>
    )
};

export default LineChart;