import React, { useState } from "react";
import { useParams } from "react-router";
import millify from "millify";
import { Typography, Select, Row, Col } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExceptionOutlined, StopOutlined, TrophyOutlined } from "@ant-design/icons";

import { useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title, Text} = Typography;
const { Option} = Select;

const CryptoDetails = () => {
    const { coinId} = useParams();
    const [ timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching} = useGetCryptoDetailsQuery(coinId);

    console.log(coinId)

    console.log(data);

    return (
        <div>
            CryptoDetails {coinId}
        </div>
    )
}

export default CryptoDetails;