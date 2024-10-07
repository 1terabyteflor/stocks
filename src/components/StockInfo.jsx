import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StockInfo = () => {
    const { symbol } = useParams();
    const [stockData, setStockData] = useState(null);
    const [interval, setInterval] = useState('5min');
    const [historicalData, setHistoricalData] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchStockData = async () => {
        const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=e41f904122db48659f7940a9f498308b`);
        const data = await response.json();
        setStockData(data.values);
    };

    const fetchHistoricalData = async () => {
        if (startDate && endDate) {
            const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${startDate}&end_date=${endDate}&apikey=e41f904122db48659f7940a9f498308b`);
            const data = await response.json();
            setStockData(data.values);
        }
    };

    useEffect(() => {
        if (historicalData) {
            fetchHistoricalData();
        } else {
            fetchStockData();
        }
    }, [symbol, interval, historicalData, startDate, endDate]);

    const options = {
        title: {
            text: `Cotización de ${symbol}`
        },
        series: [{
            data: stockData ? stockData.map(item => [new Date(item.datetime).getTime(), parseFloat(item.close)]) : []
        }]
    };

    return (
        <div>
            <h1>Detalles de {symbol}</h1>
            <div>
                <label>
                    <input 
                        type="radio" 
                        value="realTime" 
                        checked={!historicalData} 
                        onChange={() => setHistoricalData(false)} 
                    />
                    Tiempo Real
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="historical" 
                        checked={historicalData} 
                        onChange={() => setHistoricalData(true)} 
                    />
                    Histórico
                </label>
            </div>
            {historicalData && (
                <div>
                    <h3>Selecciona el rango de fechas</h3>
                    <input 
                        type="datetime-local" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                    <input 
                        type="datetime-local" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </div>
            )}
            <div>
                <label>Intervalo:</label>
                <select onChange={(e) => setInterval(e.target.value)} value={interval}>
                    <option value="1min">1 Minuto</option>
                    <option value="5min">5 Minutos</option>
                    <option value="15min">15 Minutos</option>
                </select>
            </div>
            <button onClick={historicalData ? fetchHistoricalData : fetchStockData}>
                {historicalData ? 'Obtener Datos Históricos' : 'Obtener Datos en Tiempo Real'}
            </button>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default StockInfo;