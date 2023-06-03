import React, { useState} from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Typography, Avatar} from 'antd';

import { useGetNewsQuery } from "../services/newsApi";
import moment from "moment/moment";

const { Title, Text} = Typography;

const News = ( props) => {
    const { data, isFetching} = useGetNewsQuery({ newsCategory: 'Cryptocurrency', count: props.simplified? 10:100});
    
    if(isFetching) return 'Loading...'

    return (
        <>
            {!props.simplified && 
            <Title level={2}>
                Latest Cryptocurrency News
            </Title>}
            <Row gutters={[24, 24]} className="crypto-card-container">
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
                                        {news.description}
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