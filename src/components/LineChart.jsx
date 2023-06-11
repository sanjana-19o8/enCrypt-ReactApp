import React from "react";
import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';

const LineChart = ({ coinHistory, currentPrice, coinName}) => {
    
    const coinPrice = [];
    const coinTimeStamp = [];

    for(let i=0; i< coinHistory?.data?.history?.length; i += 1){
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp));
    }
    
    const data = {

    }

    const options = {
        
    }

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