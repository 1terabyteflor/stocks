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
            color: 'purple',
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
            <div className='flex justify-start gap-x-8 items-center mb-4'>
            <button 
                onClick={() => navigate(-1)}
                className="rounded-lg border p-2 text-xs hover:bg-gray-400 transition"
            >
                Volver
            </button>
            <h1 className="text-5xl font-bold text-purple-primary">{symbol}</h1>

            </div>
            <div className='flex flex-col'>
            <div className="mb-4">
                <label className="mr-4">
                    <input 
                        type="radio" 
                        value="realTime" 
                        checked={!historicalData} 
                        onChange={() => setHistoricalData(false)} 
                        className="mr-1 accent-purple-primary"
                    />
                    Tiempo Real
                </label>
                <label className="mr-4">
                    <input 
                        type="radio" 
                        value="historical" 
                        checked={historicalData} 
                        onChange={() => setHistoricalData(true)} 
                        className="mr-1 accent-purple-primary"
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
                    <option value="1min">1 min</option>
                    <option value="5min">5 min</option>
                    <option value="15min">15 min</option>
                </select>
            </div>
            <button 
                onClick={handleFetchData}
                className="bg-purple-primary text-white rounded p-2 hover:bg-gray-700 transition"
            >
                {historicalData ? 'Obtener Datos Históricos' : 'Obtener Datos en Tiempo Real'}
            </button>

            </div>
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