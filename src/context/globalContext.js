import { createContext, useState } from "react";
import { Medida } from "../pages/medidas/medidas";
import { Probabilidad } from "../pages/probabilidad/probabilidad";
import { ColumnData } from "../hooks/useTables";

export const globalContext = createContext();

export function GlobalProvider({children}){
    const [getCheck, setCheck] = useState(false);
    const [getName, setName] = useState("prueba");
    const [getColumns, setColumns] = useState({
        columns:[
            new ColumnData("intervalo", "intervalo"),
            new ColumnData("frecuencia", "frecuencia"),
            new ColumnData("frecuencia acomulada", "frecuencia acomulada"),
            new ColumnData("frecuencia absoluta", "frecuencia absoluta"),
            new ColumnData("frecuencia absoluta acomulada", "frecuencia absoluta acomulada")
        ],
        data:[
            {
                "intervalo":"0-10",
                "frecuencia":"3",
                "frecuencia acomulada":"3",
                "frecuencia absoluta":"0.1",
                "frecuencia absoluta acomulada":"0.1"
            },
            {
                "intervalo":"0-10",
                "frecuencia":"3",
                "frecuencia acomulada":"3",
                "frecuencia absoluta":"0.1",
                "frecuencia absoluta acomulada":"0.1"
            },
            {
                "intervalo":"0-10",
                "frecuencia":"3",
                "frecuencia acomulada":"3",
                "frecuencia absoluta":"0.1",
                "frecuencia absoluta acomulada":"0.1"
            },
            {
                "intervalo":"0-10",
                "frecuencia":"3",
                "frecuencia acomulada":"3",
                "frecuencia absoluta":"0.1",
                "frecuencia absoluta acomulada":"0.1"
            },
            {
                "intervalo":"0-10",
                "frecuencia":"3",
                "frecuencia acomulada":"3",
                "frecuencia absoluta":"0.1",
                "frecuencia absoluta acomulada":"0.1"
            }
        ]
    });
    const [getMedidas, setMedidas] = useState([
        new Medida("promedio", 10),
        new Medida("mediana", 5),
        new Medida("varianza", 60),
        new Medida("esperanza", 60),
        new Medida("vida", 60),
        new Medida("vida", 60)
    ]);
    const [getOdds, setOdds] = useState([
        new Probabilidad("x", 1),
        new Probabilidad("y", 0.1)
    ]);
    const [getSerie, setSerie] = useState({
        "name": "x",
        "min-x":0,
        "min-y":0,
        "max-x":5,
        "max-y":5,
        "repeat":5,
        "values":[
            {"x":0, "y":0},
            {"x":1, "y":1},
            {"x":2, "y":2},
            {"x":3, "y":3},
            {"x":4, "y":4},
            {"x":5, "y":5}
        ]
    });
    return(
    <globalContext.Provider value={{
        getCheck:getCheck,
        setCheck:setCheck,
        getName: getName,
        setName: setName,
        getMedidas:getMedidas,
        setMedidas: setMedidas,
        getOdds:getOdds,
        setOdds:setOdds,
        getSerie:getSerie,
        setSerie:setSerie,
        setColumns:setColumns,
        getColumns:getColumns
    }}>
        {children}
    </globalContext.Provider>
    );
}