import React from 'react';

const CryptoCard = ({ coin }) => {
    const isPositive = coin.price_change_percentage_24h >= 0;

    // Simple sparkline visualization using SVG
    const sparklineData = coin.sparkline_in_7d?.price || [];
    const minPrice = Math.min(...sparklineData);
    const maxPrice = Math.max(...sparklineData);
    const range = maxPrice - minPrice;

    const points = sparklineData.map((price, index) => {
        const x = (index / (sparklineData.length - 1)) * 100;
        const y = 100 - ((price - minPrice) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="glass-panel p-4 crypto-card animate-fade-in h-100">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="rounded-circle" style={{ width: '2.5rem', height: '2.5rem' }} />
                    <div>
                        <h3 className="fw-bold fs-5 mb-0">{coin.name}</h3>
                        <span className="text-secondary text-uppercase small">{coin.symbol}</span>
                    </div>
                </div>
                <div className={`text-end ${isPositive ? 'text-success' : 'text-danger'}`}>
                    <div className="fw-bold fs-5">${coin.current_price.toLocaleString()}</div>
                    <div className="small d-flex align-items-center justify-content-end gap-1">
                        {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                </div>
            </div>

            <div className="overflow-hidden" style={{ height: '4rem' }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-100 h-100">
                    <polyline
                        fill="none"
                        stroke={isPositive ? 'var(--success)' : 'var(--danger)'}
                        strokeWidth="2"
                        points={points}
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>
        </div>
    );
};

export default CryptoCard;
