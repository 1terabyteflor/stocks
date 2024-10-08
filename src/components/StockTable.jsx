import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchStocks = async () => {
            setLoading(true); 
            try {
                const response = await fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
                const data = await response.json();
                setStocks(data.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchStocks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg">Loading...</p>
            </div>
        ); 
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Símbolo</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Moneda</th>
                        <th className="border border-gray-300 p-2">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map(stock => (
                        <tr key={stock.symbol}>
                            <td className="border border-gray-300 p-2">
                                <Link to={`/stock/${stock.symbol}`} className="text-blue-500 hover:underline">{stock.symbol}</Link>
                            </td>
                            <td className="border border-gray-300 p-2">{stock.name}</td>
                            <td className="border border-gray-300 p-2">{stock.currency}</td>
                            <td className="border border-gray-300 p-2">{stock.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockTable;