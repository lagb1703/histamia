import { useState, useEffect, useContext } from "react";
import { globalContext } from "../context/globalContext";
import { Medida } from "../pages/medidas/medidas";
import { Probabilidad } from "../pages/probabilidad/probabilidad";
import { ColumnData } from "./useTables";

async function makeFecth(getData, setData){
    if(getData === null)
        return
    await fetch("http://127.0.0.1:8000/", {
        method:"POST",
        body:JSON.stringify(getData)
    }).then(res => {
        if(res.ok)
            return res.json()
        return null;
    }).then(json =>{
        setData(json);
    })
}

export function useResult(name){
    const [getData, setData] = useState(null);
    const {setCheck, setName, setMedidas, setOdds, setSerie, setColumns} = useContext(globalContext);
    useEffect(()=>{
        if(getData === null)
            return;
        setCheck(true);
        setName(name.current);
        setMedidas(getData.CentralTendency.map((item)=>{
            return new Medida(item.name, item.value)
        }));
        setOdds(Object.keys(getData.Distribucion).map((item)=>{
            return new Probabilidad(item, getData.Distribucion[item]);
        }));
        let serie = Object.keys(getData.Histograma).map((item)=>{
            return {
                "x":Number(item),
                "y":getData.Histograma[item]
            }
        });
        setSerie({
            "values":serie
        });
        let ob = {
            columns:[
                new ColumnData("Rango", "Rango"),
                new ColumnData("Frecuencia", "Frecuencia"),
                new ColumnData("FrecuenciaAcumulada", "FrecuenciaAcumulada"),
                new ColumnData("Porcentual (%)", "Porcentual (%)"),
                new ColumnData("PorcentualAcumulado", "PorcentualAcumulado")
            ],
            data:getData.intervals
        }
        setColumns(ob);
    }, [getData]);
    return setData
}

export function useFecthBackend(){
    const [getData, setData] = useState(null);
    const [getResult, setResult] = useState(null);
    useEffect(()=>{
        makeFecth(getData, setResult);
    }, [getData]);
    return{
        result:getResult,
        setDatos:setData
    }
}