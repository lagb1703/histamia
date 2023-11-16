import * as echarts from 'echarts';
import { useEffect } from 'react';
import "./circular.css";
const option = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
};

export function Circular({id, name, subname, labels, data}){
    useEffect(()=>{
        if(labels.length === 0 || data.length === 0)
            return
        option.title.text = name;
        option.title.subtext = subname;
        option.series[0].data = labels.map((item, i)=>{
            return{
                value:data[i],
                name:item
            }
        })
        let chartDom = document.getElementById(id);
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }, [labels, data]);
    return(
        <div id={id} className='circular'>
        </div>
    )
}