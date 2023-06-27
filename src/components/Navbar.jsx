import React, { useState, useEffect } from "react";
import { Menu, Typography, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from '../images/logo192.png';

const Navbar = () => {
    const [ expandMenu, setExpandMenu] = useState(true);
    const [ screenSize, setScreenSize] = useState(null);
    
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(screenSize < 768) {
            setExpandMenu(false);
        } else {
            setExpandMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large"/>
                <Typography.Title level={2} className="logo">
                    <Link>enCrypt</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setExpandMenu(!expandMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {expandMenu && 
                <Menu theme="dark">
                    <Menu.Item key='home' icon={ <HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key='crytocurrencies' icon={ <FundOutlined />}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item key='news' icon={ <BulbOutlined />}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>
            }
        </div>
    )
}

export default Navbar;