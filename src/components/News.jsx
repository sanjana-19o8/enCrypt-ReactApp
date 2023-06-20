import React, { useState} from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Typography, Avatar, Select} from 'antd';

import { useGetNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment/moment";

const { Title, Text} = Typography;

const News = ( props) => {
    const [ selectedCrypto, setSelectedCrypto] = useState('Cryptocurrency');
    const { data: cryptoData} = useGetCryptosQuery(100);
    const { data, isFetching} = useGetNewsQuery({ newsCategory: selectedCrypto, count: props.simplified? 5:100});
    
    if(isFetching) return 'Loading...'

    return (
        <>
            {!props.simplified && 
            <>
            <Title level={2}>
                Latest Cryptocurrency News
            </Title>
            <Select 
                showSearch 
                className="select-news" 
                placeholder='Select a crypto' 
                optionFilterProp="children" 
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} 
                onChange={ val => setSelectedCrypto(val)}
            >
                <Select.Option value='Cryptocurrency'>Cryptocurrency</Select.Option>
                {cryptoData?.data?.coins.map(coin => 
                    <Select.Option value={coin.name}>{coin.name}</Select.Option>)}
            </Select>
            </>}
            <Row gutters={[24, 24]}>
                {data?.value?.map((news, i) => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card 
                            className='news-card'
                            title={news.name} 
                            hoverable={true} 
                            style={{ margin: '4px'}}
                            >
                                <a href={news.url} target="_blank" rel="noreferrer">
                                    {news?.image?.thumbnail?.contentUrl && 
                                    <img src={news.image.thumbnail.contentUrl} alt="" className="news-image" />}
                                    <Text>
                                        {news.description.length > 250 ? `${news.description.substring(0, 200)}...` : news.description}
                                    </Text>
                                </a>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="" />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </Card>
                        </Col>
                    )
                )}
            </Row>
        </>
    )
}

export default News;