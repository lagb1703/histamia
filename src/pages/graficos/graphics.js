import { Serie } from "../../componenetes/graficas/series/serie"
import { Circular } from "../../componenetes/graficas/circular/circular"
import { useContext, useEffect, useState } from "react"
import { globalContext } from "../../context/globalContext"
import { v4 as uuidv4 } from 'uuid';
import { Title } from "../../componenetes/title/title";
import "./graphics.css";

export function GraphicsPage({className}){
    const {getName, getSerie, getOdds, getCheck} = useContext(globalContext);
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
    if(!getCheck)
        return(
            <main className={className}>
                <Title titulo={"Genera un proyecto"} />
                <p>Para ver las graficas necesitaras un proyecto.</p>
            </main>
        )
    return(
    <main className={className}>
        <div className="graphicsConteiner">
            <Serie id={uuidv4()} nombre={getName} data={getSerie.values}/>
            <Circular id={uuidv4()} name={getName} subname={"no se xd"} labels={getLabels} data={getValues}/>
        </div>
    </main>)
}