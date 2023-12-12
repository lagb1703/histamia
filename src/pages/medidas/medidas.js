import { Title } from "../../componenetes/title/title";
import { globalContext } from "../../context/globalContext";
import { useContext, useEffect, useState } from "react";
import { Table } from "../../componenetes/tabla/tabla";
import { v4 as uuidv4 } from "uuid";

import "./medidas.css";

export class Medida{
    nombre = ""
    valor = ""
    constructor(nombre, valor){
        this.nombre = nombre
        this.valor = valor
    }
}

function MedidaUnitario({medida, valor}){
    return(
        <div>
            <p>{medida}</p>
            <p>{valor}</p>
        </div>
    )
}

export function MedidasPage({className}){
    const {getName, getCheck, getMedidas, getColumns} = useContext(globalContext);
    const [getSeparacion, setSeparacion] = useState([]);
    useEffect(handleSubArrays, [getMedidas]);
    function handleSubArrays(){
        let div = getMedidas.length/3;
        let subs = [];
        for (let i = 0; i < div; i++) {
            const inicio = i * 3;
            const fin = inicio + 3;
            subs.push(getMedidas.slice(inicio, fin));
        }
        setSeparacion(subs);
    }

    if(!getCheck)
        return(
        <main className={className}>
            <Title titulo={"Genera un proyecto"} />
            <p>Para ver las medidas estadisticas necesitaras un proyecto.</p>
        </main>
        )
    return(
    <section className={className}>
        <Title titulo={getName}/>
        <div className="medidasConteiner">
            <div className="tableConteiner">
                <Table columns={
                    getColumns.columns
                } data={getColumns.data}/>
            </div>
            <ul className="resultadoConteiner">
                {getSeparacion.map((divs)=>{
                    return(
                        <li key={uuidv4()}>
                            {divs.map((item)=>{
                                return <MedidaUnitario medida={item.nombre} valor={item.valor}/>
                            })}
                        </li>
                    )
                })}
            </ul>
        </div>
    </section>)
}