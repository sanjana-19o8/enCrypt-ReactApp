import React from "react";
import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';

const LineChart = ({ coinHistory, currentPrice, coinName}) => {
    
    const coinPrice = [];
    const coinTimeStamp = [];

    for(let i=0; i< coinHistory?.data?.history?.length; i += 1){
        coinPrice.oush(coinHistory?.data?.history[i].price);
        coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp));
    }
    
    const data = {
        
    }

    return (
        <>
        LineChart
        </>
    )
};

export default LineChart;