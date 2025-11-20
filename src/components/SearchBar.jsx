import React, { useState, useEffect } from 'react';
import { searchCoins } from '../services/api';

const SearchBar = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 1) {
                const coins = await searchCoins(query);
                setResults(coins.slice(0, 5));
                setIsOpen(true);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="position-relative mx-auto mb-5" style={{ maxWidth: '28rem', zIndex: 50 }}>
            <div className="position-relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a coin..."
                    className="form-control form-control-lg search-input px-4 py-3"
                />
                <span className="position-absolute end-0 top-50 translate-middle-y me-4 text-secondary">
                    🔍
                </span>
            </div>

            {isOpen && results.length > 0 && (
                <div className="position-absolute w-100 search-dropdown animate-fade-in">
                    {results.map((coin) => (
                        <div
                            key={coin.id}
                            onClick={() => {
                                onSelect(coin);
                                setQuery('');
                                setIsOpen(false);
                            }}
                            className="search-dropdown-item d-flex align-items-center gap-3"
                        >
                            <img src={coin.thumb} alt={coin.name} className="rounded-circle" style={{ width: '1.5rem', height: '1.5rem' }} />
                            <span className="fw-medium">{coin.name}</span>
                            <span className="small text-secondary text-uppercase">{coin.symbol}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
