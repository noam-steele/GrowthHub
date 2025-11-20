import React, { useEffect, useState } from 'react';
import { getFearGreedIndex } from '../services/api';

const StatsTicker = () => {
    const [fearGreed, setFearGreed] = useState({ value: '...', classification: 'Loading' });

    useEffect(() => {
        loadFearGreed();
    }, []);

    const loadFearGreed = async () => {
        const data = await getFearGreedIndex();
        setFearGreed(data);
    };

    // Calculate days until next Bitcoin halving (estimated April 2028)
    const getNextHalvingDays = () => {
        const nextHalving = new Date('2028-04-15');
        const today = new Date();
        const diffTime = nextHalving - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Calculate days since last Bitcoin halving (April 2024)
    const getLastHalvingDays = () => {
        const lastHalving = new Date('2024-04-20');
        const today = new Date();
        const diffTime = today - lastHalving;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Calculate days until next Fed meeting (estimated Dec 17-18, 2024)
    const getFedMeetingDays = () => {
        const nextMeeting = new Date('2024-12-18');
        const today = new Date();
        const diffTime = nextMeeting - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const stats = [
        {
            label: 'Next BTC Halving',
            value: `${getNextHalvingDays()} days`,
            icon: '₿'
        },
        {
            label: 'Last BTC Halving',
            value: `${getLastHalvingDays()} days ago`,
            icon: '⏱️'
        },
        {
            label: 'Fed Interest Rate',
            value: '4.50%',
            icon: '📊'
        },
        {
            label: 'Next Fed Meeting',
            value: `${getFedMeetingDays()} days`,
            icon: '🏛️'
        },
        {
            label: 'BTC Exchange Reserves',
            value: '2.45M BTC',
            icon: '🏦'
        },
        {
            label: 'ETH Exchange Reserves',
            value: '18.2M ETH',
            icon: '💎'
        },
        {
            label: 'Fear & Greed Index',
            value: `${fearGreed.value} (${fearGreed.classification})`,
            icon: '😱'
        }
    ];

    return (
        <div className="stats-ticker-wrapper">
            <div className="stats-ticker-track">
                {/* Duplicate stats multiple times for seamless loop */}
                {[...stats, ...stats, ...stats].map((stat, index) => (
                    <div key={index} className="stats-ticker-item">
                        <span className="stats-icon">{stat.icon}</span>
                        <span className="stats-label">{stat.label}:</span>
                        <span className="stats-value">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsTicker;
