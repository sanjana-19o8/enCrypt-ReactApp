import React, { useState} from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Typography} from 'antd';

import { useGetNewsQuery } from "../services/newsApi";

const { Title, Text} = Typography;

const News = ( props) => {
    const { data, isFetching} = useGetNewsQuery({ newsCategory: 'Cryptocurrency', count: props.simplified? 10:100});
    
    if(isFetching) return 'Loading...'

    return (
        <>
            <Title level={2}>
                Latest Cryptocurrency News
            </Title>
            <Row gutters={[24, 24]} className="crypto-card-container">
                {data?.value?.map((news, i) => (
                        <Col xs={24} sm={12} lg={8} className='news-card' key={i}>
                            <Card 
                            title={news.name} 
                            hoverable={true} 
                            style={{ margin: '4px'}}
                            >
                                <a href={news.url} target="_blank" rel="noreferrer">
                                    {news?.image?.thumbnail?.contentUrl && 
                                    <img src={news?.image?.thumbnail?.contentUrl} alt="" className="news-image" />}
                                    <Text>
                                        {news.description}
                                    </Text>
                                </a>
                            </Card>
                        </Col>
                    )
                )}
            </Row>
        </>
    )
}

export default News;