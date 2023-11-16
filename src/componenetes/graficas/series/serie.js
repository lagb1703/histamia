import * as echarts from 'echarts';
import { useEffect } from 'react';
import "./serie.css";
const option = {
    legend: {
        data: ['Altitude (km) vs. temperature (°C)']
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        axisLabel: {
        formatter: '{value}'
        }
    },
    yAxis: {
        type: 'category',
        axisLine: { onZero: false },
        axisLabel: {
        formatter: '{value}'
        },
        boundaryGap: false,
        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
    },
    series: [
        {
        name: 'Altitude (km) vs. temperature (°C)',
        type: 'line',
        symbolSize: 10,
        symbol: 'circle',
        smooth: true,
        lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8
        },
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
        }
    ]
};

export function Serie({id, nombre, data}){
    useEffect(()=>{
        if(data.length === 0)
            return
        let x = [];
        let y = data.map((item, i)=>{
            x.push(item.x);
            return item.y;
        });
        option.legend.data = [nombre];
        option.yAxis.data = y;
        option.series[0].name = nombre;
        option.series[0].data = x;
        let chartDom = document.getElementById(id);
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }, [data]);
    return(
        <div id={id} className='serie'>
        </div>
    )
}