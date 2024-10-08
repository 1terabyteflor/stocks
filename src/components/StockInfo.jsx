import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useStockData from '../hooks/useStockCompleteData';

const StockInfo = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const [interval, setInterval] = useState('5min');
    const [historicalData, setHistoricalData] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { stockData, loading, error } = useStockData(symbol, interval, historicalData, startDate, endDate);

    const options = {
        title: {
            text: `Cotización de ${symbol}`
        },
        series: [{
            data: stockData ? stockData.map(item => [new Date(item.datetime).getTime(), parseFloat(item.close)]) : []
        }]
    };

    const handleFetchData = () => {
        if (historicalData && (!startDate || !endDate)) {
            alert('Select a valid date! ');
            return;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <button 
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-300 text-black rounded p-2 hover:bg-gray-400 transition"
            >
                Volver
            </button>
            <h1 className="text-3xl font-bold mb-4">{symbol}</h1>
            <div className="mb-4">
                <label className="mr-4">
                    <input 
                        type="radio" 
                        value="realTime" 
                        checked={!historicalData} 
                        onChange={() => setHistoricalData(false)} 
                        className="mr-1"
                    />
                    Tiempo Real
                </label>
                <label className="mr-4">
                    <input 
                        type="radio" 
                        value="historical" 
                        checked={historicalData} 
                        onChange={() => setHistoricalData(true)} 
                        className="mr-1"
                    />
                    Histórico
                </label>
            </div>
            {historicalData && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Fechas</h3>
                    <input 
                        type="datetime-local" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="border border-gray-300 rounded p-2 mr-2"
                    />
                    <input 
                        type="datetime-local" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
            )}
            <div className="mb-4">
                <label className="mr-2">Intervalo</label>
                <select onChange={(e) => setInterval(e.target.value)} value={interval} className="border border-gray-300 rounded p-2">
                    <option value="1min">1 MIN</option>
                    <option value="5min">5 MIN</option>
                    <option value="15min">15 MIN</option>
                </select>
            </div>
            <button 
                onClick={handleFetchData}
                className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
            >
                {historicalData ? 'Obtener Datos Históricos' : 'Obtener Datos en Tiempo Real'}
            </button>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-5">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    );
};

export default StockInfo;