import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStocks from '../hooks/useStocks'; 

const StockTable = () => {
    const { filteredStocks, loading } = useStocks(); 
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg">Cargando...</p>
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

export default StockTable;