import * as echarts from 'echarts';
import { useEffect } from 'react';
import "./barras.css";
const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [
            120,
            {
            value: 200,
            itemStyle: {
                color: '#a90000'
            }
            },
            150,
            80,
            70,
            110,
            130
        ],
        type: 'bar'
        }
    ]
};

export function Barras({id, labels, data}){
    useEffect(()=>{
        if(labels.length == 0 || data.length === 0)
            return
        option.xAxis.data = labels;
        option.series[0].data = [...data]
        option.series[0].data[0] = {
            value: option.series[0].data[0],
            itemStyle: {
              color: '#a90000'
            }
        };
        let chartDom = document.getElementById(id);
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }, [labels, data]);
    return(
        <div id={id} className='barras'>
        </div>
    )
}