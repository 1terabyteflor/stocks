import { useState, useEffect } from 'react';

const useStockData = (symbol, interval, historicalData, startDate, endDate) => {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseApiUrl = `https://api.twelvedata.com/time_series?apikey=${process.env.API_KEY}`

    useEffect(() => {
        const fetchStockData = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = historicalData 
                    ? `${baseApiUrl}?symbol=${symbol}&interval=${interval}&start_date=${startDate}&end_date=${endDate}`
                    : `${baseApiUrl}?symbol=${symbol}&interval=${interval}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setStockData(data.values);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (symbol) {
            fetchStockData();
        }
    }, [symbol, interval, historicalData, startDate, endDate]);

    return { stockData, loading, error };
};

export default useStockData;
