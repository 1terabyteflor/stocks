import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
            const data = await response.json();
            setStocks(data.data);
            setFilteredStocks(data.data); // Inicialmente, mostrar todas las acciones
        };
        fetchStocks();
    }, []);

    const handleSearch = (searchTerm, searchType) => {
        const filtered = stocks.filter(stock => 
            searchType === 'symbol' 
                ? stock.symbol.includes(searchTerm) 
                : stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStocks(filtered);
    };

    return (
        <div className="text-center p-5">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a la Aplicación de Acciones</h1>
            <p className="mb-4">
                Esta aplicación te permite consultar acciones del mercado, ver detalles de cada acción y graficar su cotización en tiempo real o histórica.
            </p>
            <Search onSearch={handleSearch} />
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
                    {filteredStocks.map(stock => (
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

export default Home;