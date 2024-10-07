import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StockInfo = ({ match }) => {
    const [stockData, setStockData] = useState(null);
    const [interval, setInterval] = useState('5min');

    useEffect(() => {
        const fetchStockData = async () => {
            const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${match.params.symbol}&interval=${interval}&apikey=e41f904122db48659f7940a9f498308b`);
            const data = await response.json();
            setStockData(data.values);
        };
        fetchStockData();
    }, [match.params.symbol, interval]);

    const options = {
        title: {
            text: `Cotización de ${match.params.symbol}`
        },
        series: [{
            data: stockData ? stockData.map(item => [new Date(item.datetime).getTime(), parseFloat(item.close)]) : []
        }]
    };

    return (
        <div>
            <h1>Detalles de {match.params.symbol}</h1>
            <select onChange={(e) => setInterval(e.target.value)}>
                <option value="1min">1 Minuto</option>
                <option value="5min">5 Minutos</option>
                <option value="15min">15 Minutos</option>
            </select>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default StockInfo;
