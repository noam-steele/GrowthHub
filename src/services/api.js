const BASE_URL = 'https://api.coingecko.com/api/v3';
const NEWS_API_KEY = 'demo'; // Using demo key for now - has limitations
const NEWS_API_URL = 'https://newsapi.org/v2';

export const getTopCoins = async (currency = 'usd', perPage = 9) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=24h`
    );
    if (!response.ok) throw new Error('Failed to fetch coins');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top coins:', error);
    return [];
  }
};

export const searchCoins = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    if (!response.ok) throw new Error('Failed to search coins');
    const data = await response.json();
    return data.coins;
  } catch (error) {
    console.error('Error searching coins:', error);
    return [];
  }
};

export const getCryptoNews = async () => {
  try {
    // Using NewsAPI with crypto-related keywords
    const query = 'cryptocurrency OR bitcoin OR ethereum OR crypto';
    const response = await fetch(
      `${NEWS_API_URL}/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=4&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      // Fallback to mock data if API fails (demo key has limitations)
      return getMockNews();
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    return getMockNews();
  }
};

// Mock news data as fallback
const getMockNews = () => [
  {
    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
    description: "Major financial institutions continue to embrace cryptocurrency as Bitcoin surges past previous records.",
    url: "https://www.coindesk.com/markets/2024/11/15/bitcoin-hits-new-highs/",
    urlToImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400",
    publishedAt: new Date().toISOString(),
    source: { name: "Crypto News" }
  },
  {
    title: "Ethereum 2.0 Upgrade Shows Promising Results",
    description: "The latest Ethereum network upgrade demonstrates significant improvements in transaction speed and energy efficiency.",
    url: "https://cointelegraph.com/news/ethereum-2-0-upgrade-success",
    urlToImage: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: "Blockchain Today" }
  },
  {
    title: "Regulatory Clarity Boosts Crypto Market Confidence",
    description: "New regulatory frameworks provide clearer guidelines for cryptocurrency operations worldwide.",
    url: "https://www.bloomberg.com/crypto",
    urlToImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: "Financial Times" }
  },
  {
    title: "DeFi Platforms See Record Trading Volumes",
    description: "Decentralized finance continues to grow with unprecedented user engagement and trading activity.",
    url: "https://decrypt.co/defi",
    urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: "DeFi Weekly" }
  }
];

// Fetch Fear & Greed Index from Alternative.me
export const getFearGreedIndex = async () => {
  try {
    const response = await fetch('https://api.alternative.me/fng/?limit=1');
    if (!response.ok) throw new Error('Failed to fetch Fear & Greed Index');
    const data = await response.json();
    const index = data.data[0];
    return {
      value: index.value,
      classification: index.value_classification
    };
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error);
    return { value: '72', classification: 'Greed' };
  }
};

// Fetch global crypto data from CoinGecko (includes some market stats)
export const getGlobalData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/global`);
    if (!response.ok) throw new Error('Failed to fetch global data');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    return null;
  }
};
