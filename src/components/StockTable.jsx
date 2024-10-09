import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StockTable = ({ stocks, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25; 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(stocks.length / itemsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg">Cargando...</p>
            </div>
        ); 
    }


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Símbolo</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Moneda</th>
                        <th className="border border-gray-300 p-2">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(stock => (
                        <tr key={stock.symbol}>
                            <td className="border border-gray-300 p-2">
                                <Link to={`/stock/${stock.symbol}`} className="text-purple-primary hover:text-gray-700 hover:underline">{stock.symbol}</Link>
                            </td>
                            <td className="border border-gray-300 p-2">{stock.name}</td>
                            <td className="border border-gray-300 p-2">{stock.currency}</td>
                            <td className="border border-gray-300 p-2">{stock.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className="mx-1 px-3 py-1 rounded-lg border hover:bg-gray-100 transition"
                    >
                        Anterior
                    </button>
                )}
                {currentPage < totalPages && (
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className="mx-1 px-3 py-1 rounded-lg border hover:bg-gray-100 transition"
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};

export default StockTable;