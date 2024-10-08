import { useState, useEffect } from 'react';
import axios from 'axios';

const useSearch = (searchTerm, searchType) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm) {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`https://api.twelvedata.com/stocks?source=docs&exchange=NYSE`);
                    const data = response.data.data;
                    const filteredSuggestions = data.filter(stock => 
                        searchType === 'symbol' 
                            ? stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) 
                            : stock.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setSuggestions(filteredSuggestions);
                } catch (err) {
                    setError('Error al obtener sugerencias');
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [searchTerm, searchType]);

    return { suggestions, loading, error };
};

export default useSearch;