import React, { useEffect, useState} from "react";
import millify from "millify";
import { Row, Col, Card, Input} from 'antd';
import { Link } from "react-router-dom";

import { useGetCryptosQuery} from '../services/cryptoApi';


const Cryptocurrencies = ( props) => {
    const count = props.simplified? 10: 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [ cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [ searchTerm, setSearchTerm] = useState('');

    useEffect( () => {
        const filteredCoins = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredCoins);

    }, [ cryptosList, searchTerm]);

    if(isFetching) return ('Loading...');

    return (
        <>
            {!props.simplified && 
            <div className="search-crypto">
                <Input 
                placeholder="Search Cryptocurrencies" 
                onChange={ (e) => {
                    setSearchTerm(e.target.value);
                }}/>
            </div>}

            <Row gutters={[32,32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                            <Link to={`/crypto/${currency.uuid}`}>
                                <Card 
                                title={`#${currency.rank} ${currency.name}`} 
                                // eslint-disable-next-line jsx-a11y/alt-text
                                extra={<img src={currency.iconUrl} className="crypto-image" />} 
                                hoverable={true} 
                                style={{ margin: '4px'}}
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    )
                )}
            </Row>
        </>
    )
}

export default Cryptocurrencies;