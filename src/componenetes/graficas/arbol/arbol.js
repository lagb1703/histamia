import * as echarts from 'echarts';
import { useEffect } from 'react';
import "./arbol.css";
const option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
        type: 'tree',
        data: [
            {
                name:"one",
                children:[
                    {
                        name:"two",
                        value: 1
                    },
                    {
                        name:"three",
                        value: 2
                    }
                ]
            }
        ],
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9
        },
        leaves: {
            label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
            }
        },
        emphasis: {
            focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
        }
    ]
}

function probabilidadCombinada(data, probabilidad, index){
    if(index == data.length){
        return {
            name:data[index-1].evento,
            value:probabilidad
        }
    }
    let left = probabilidadCombinada(data, probabilidad*data[index].probabilidad, index+1);
    let rigth = probabilidadCombinada(data, probabilidad*(1-data[index].probabilidad), index+1);
    rigth.name = "¬" + rigth.name
    if(index == 0)
        return{
            name:"inicio",
            value:data[0].probabilidad,
            children:[
                left,
                rigth
            ]
    }
    return{
        name:data[index-1].evento,
        value:probabilidad,
        children:[
            left,
            rigth
        ]
    }
}

export function Arbol({id, data}){
    useEffect(()=>{
        if(data.length === 0)
            return
        option.series[0].data = [probabilidadCombinada(data, 1, 0)];
        let chartDom = document.getElementById(id);
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }, [data]);
    return(
        <div id={id} className='arbol'>
        </div>
    )
}