import Chart from 'chart.js';
import { useRef, useState, useEffect } from 'react';

const Plot = function(props) {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, props.chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, props.chartConfig]);

    return (
        <div className="chart" >
            <canvas ref={chartContainer}></canvas>
        </div>
    );
}

export default Plot;