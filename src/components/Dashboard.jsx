import React, { useEffect, useState } from 'react';
import { getTopCoins, getCryptoNews } from '../services/api';
import CryptoCard from './CryptoCard';
import SearchBar from './SearchBar';
import NewsCard from './NewsCard';
import StatsTicker from './StatsTicker';

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [coinsData, newsData] = await Promise.all([
            getTopCoins(),
            getCryptoNews()
        ]);
        setCoins(coinsData);
        setNews(newsData);
        setLoading(false);
    };

    const handleAddCoin = (newCoin) => {
        // In a real app, we'd fetch the full market data for this coin
        // For this demo, we'll just reload the top coins to simulate a refresh
        // or we could add it if we had an endpoint for specific coin details with sparkline
        console.log('Selected coin:', newCoin);
        // Optimistic UI or fetch specific coin data here
    };

    return (
        <>
            <StatsTicker />
            <div className="container py-5">
                <header className="text-center mb-5 pt-5">
                    <h1 className="display-3 fw-bold mb-3 text-gradient">Crypto Tracker</h1>
                    <p className="text-secondary fs-5">Real-time market insights for top cryptocurrencies</p>
                </header>

                <SearchBar onSelect={handleAddCoin} />

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '16rem' }}>
                        <div className="spinner-border spinner-border-accent" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 3x3 Crypto Grid */}
                        <div className="row g-4 mb-5">
                            {coins.map((coin) => (
                                <div key={coin.id} className="col-4">
                                    <CryptoCard coin={coin} />
                                </div>
                            ))}
                        </div>

                        {/* News Carousel - Continuous Scroll */}
                        <div className="mt-5">
                            <h2 className="h4 fw-bold mb-4 text-gradient">Latest Crypto News</h2>
                            <div className="news-carousel-wrapper">
                                <div className="news-carousel-track">
                                    {/* Duplicate news items for seamless loop */}
                                    {[...news, ...news].map((article, index) => (
                                        <div key={index} className="news-carousel-item">
                                            <NewsCard article={article} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Dashboard;
