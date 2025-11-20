import React from 'react';

const NewsCard = ({ article }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-block"
        >
            <div className="glass-panel p-4 news-card-carousel" style={{ height: '380px' }}>
                <div className="d-flex flex-column h-100">
                    {/* Fixed height image area */}
                    <div className="mb-3" style={{ height: '180px', overflow: 'hidden', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        {article.urlToImage ? (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary">
                                📰
                            </div>
                        )}
                    </div>

                    <div className="mb-2">
                        <span className="badge bg-secondary small">{article.source?.name || 'News'}</span>
                        <span className="text-secondary small ms-2">{formatDate(article.publishedAt)}</span>
                    </div>

                    {/* Fixed height title */}
                    <h5 className="fw-bold mb-2" style={{
                        fontSize: '1rem',
                        lineHeight: '1.4',
                        height: '2.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {article.title}
                    </h5>

                    {/* Fixed height description */}
                    <p className="text-secondary small mb-0" style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        height: '4.5rem'
                    }}>
                        {article.description || 'Click to read more...'}
                    </p>
                </div>
            </div>
        </a>
    );
};

export default NewsCard;
