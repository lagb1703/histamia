import { useEffect, useState } from "react";
import Papa from "papaparse";
export class ColumnData{
    name = ""
    value = ""
    constructor(name, value){
        this.name = name
        this.value = value
    }
}
export function useTableData(maximo){
    const [getData, setData] = useState("");
    const [getCsvData, setCsvData] = useState([]);
    const [getColumns, setColumns] = useState([]);
    const [getRow, setRow] = useState([]);
    const [getMaximo] = useState(maximo);
    useEffect(()=> {
        Papa.parse(getData, {
            header: false,
            complete: (result) => {
                let filter = result.data.filter(fila => fila.some(valor => valor !== null && valor !== '' && valor !== " "));
                if(filter.length === 0)
                    return;
                setCsvData(filter);
                let first = filter.shift();
                setColumns(first.map((i)=>new ColumnData(i,i)));
                let body = filter.slice(0, getMaximo).map((item)=>{
                    let obj = {};
                    item.forEach((valor, index)=>{
                        obj[first[index]] = valor;
                    });
                    return obj;
                });
                setRow(body);
            },
        })
    }, [getData, getMaximo]);
    return{
        get:getCsvData,
        set:setData,
        columns:getColumns,
        row:getRow,
        data:getData
    }
}