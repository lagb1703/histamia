import { useContext, useState, useEffect } from "react"
import { globalContext } from "../../context/globalContext"
import { Title } from "../../componenetes/title/title"
import { Barras } from "../../componenetes/graficas/barras/barras"
import { Circular } from "../../componenetes/graficas/circular/circular"
import { Arbol } from "../../componenetes/graficas/arbol/arbol"
import { Serie } from "../../componenetes/graficas/series/serie"
import { v4 as uuidv4 } from 'uuid';
import "./probabilidad.css"

export class Probabilidad{
    evento=""
    probabilidad=0
    constructor(evento, probabilidad) {
        this.evento = evento;
        this.probabilidad = probabilidad;
    }
}

export function OddsPage({className}){
    const {getName, getCheck, getOdds, getSerie} = useContext(globalContext);
    const [getLabels, setLabels] = useState([]);
    const [getValues, setValues] = useState([]);
    useEffect(()=>{
        let labels = [];
        let values = [];
        for(let i = 0; i < getOdds.length; i++){
            labels.push(getOdds[i].evento);
            values.push(getOdds[i].probabilidad);
        }
        setLabels(labels);
        setValues(values);
    }, [getOdds]);
    if(getCheck)
        return(
        <main className={className}>
            <Title titulo={"Genera un proyecto"} />
            <p>Para ver las probabilidades necesitaras un proyecto.</p>
        </main>
        )
    return(
    <section  className={className}>
        <Title titulo={getName}/>
        <div className="contenedorGraficasGrande">
            <div className="contenedorGraficas">
                <Barras id={uuidv4()} labels={getLabels} data={getValues}/>
                <Arbol id={uuidv4()} data={getOdds}/>
                <Serie id={uuidv4()} nombre={getSerie.name} data={getSerie.values}/>
                <Circular id={uuidv4()} name={getName} subname={"no se xd"} labels={getLabels} data={getValues}/>
            </div>
        </div>
    </section>
    )
}