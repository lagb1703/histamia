import "./nuevo.css";
import { Title } from "../../componenetes/title/title";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useTableData } from "../../hooks/useTables";
import { Table } from "../../componenetes/tabla/tabla";

class magicWorks{
    saveValue = "save"
    integerName = "Entero"
    integerValue = "entero"
    stringName = "Palabra"
    stringValue = "string"
    floatName = "punto flotante"
    floatValue = "float"
    maxInputTypeSize = 14
}

const magic = Object.freeze(new magicWorks());

const dataTypes = [
    {
        nombre:magic.integerName,
        valor:magic.integerValue
    },
    {
        nombre:magic.stringName,
        valor:magic.stringValue
    },
    {
        nombre:magic.floatName,
        valor:magic.floatValue
    },

]

function EventProbabilistics( {id, setEvents}){
    let handleDeleteButton= (id)=>(e)=>{
        e.preventDefault();
        setEvents((events)=>events.filter((item)=>{
            return item !== id;
        }))
    }
    function handleChange(e){
        let value = e.target.value;
        if(value === "")
            return
        let values = value.split(" ");
        if(values.length !== 3 || values[2] === ""){
            e.target.style.color = "red";
            return;
        }
        e.target.style.color = "";
    }
    return(
        <li className="Event">
            <input onChange={handleChange} type="text" placeholder="x = 5"/>
            <button onClick={handleDeleteButton(id)}>Eliminar</button>
        </li>
    )
}

function FormData({get, set, setTitle, data}){
    const [getUse, setUse] = useState(false);
    const [getDisableSelects, setDisableSelects] = useState(true);
    const [Events, setEvents] = useState([uuidv4()])
    useEffect(handleColumnActiveSelect, [get]);
    function handleColumnActiveSelect(){
        if(get.length > 0){
            setDisableSelects(false);
            return;
        }
        setDisableSelects(true);
    }
    function handleValor(){
        setUse(true);
    }

    function handleTitleChange(e){
        let valor = e.target.value;
        if(valor.length > magic.maxInputTypeSize){
            e.target.value = valor.substring(0, magic.maxInputTypeSize);
            return;
        }
        setTitle(valor);
    }

    function handleAddEvents(e){
        e.preventDefault()
        setEvents((preItems)=>[...preItems, uuidv4()])
    }

    function handleOnSumitFile(e){
        const files = e.target.files
        if(!files || files.length === 0)
            return
        const file = files[0]
        if(!file.name.endsWith(".csv"))
            return
        let Reader = new FileReader();
        Reader.onload = (i) =>{
            set(i.target.result);
        }
        Reader.readAsText(file);
    }

    function handleSumit(e){
        e.preventDefault();
        let proyectName = e.target[0].value;
        let guardar = e.target[2].checked;
        let columna = e.target[3].value;
        let tipoValor = e.target[4].value;
        let consuelo = [];
        if(proyectName === "" || data === "" || columna === "Columna" || tipoValor === "Tipo Valor"){
            alert("te faltan rellenar datos");
            return;
        }

        for(let i = 5; i < e.target.length-2; i+=2){
            if(e.target[i].value === "" || e.target[i].style.color === "red")
                return
            consuelo.push(e.target[i].value)
        }
    }
    return(
        <form className="nuevoProyectoFrom" onSubmit={handleSumit}>
            <div>
                <input id="nombre" name="nombre" type="text" onChange={handleTitleChange}/>
                <input onChange={handleOnSumitFile} id="file" name="file" type="file"/>
            </div>
            <div>
                <input type="checkbox" id={magic.saveValue} value={magic.saveValue}/>
                <label htmlFor={magic.saveValue}>Guardar</label>
            </div>
            <div className="columnaSelect">
                <select disabled={getDisableSelects}>
                    {(get.length === 0)?<option>Columna</option>:<></>}
                    {get.map((item)=>{
                        return<option key={uuidv4()} value={item.valor}>{item.name}</option>
                    })}
                </select>
                <select disabled={getDisableSelects} onClick={handleValor}>
                    {(!getUse)?<option>Tipo Valor</option>:<></>}
                    {dataTypes.map((item)=>{
                        return(<option key={uuidv4()} value={item.valor}>{item.nombre}</option>)
                    })}
                </select>
            </div>
            <ul className="EventContainer">
                {Events.map((item)=>{
                    return(
                        <EventProbabilistics id={item} setEvents={setEvents} key={item}/>
                    )
                })}
                <li>
                    <button onClick={handleAddEvents}>Agregar Evento</button>
                </li>
            </ul>
            <button>Calcular</button>
        </form>
    )
}

export function NuevoPage({className}){
    const [getTitle, setTitle] = useState("Nuevo proyecto");
    useEffect(handleTitleText, [getTitle]);
    const {set, get, columns, row} = useTableData(10);
    function handleTitleText(){
        if(getTitle === "")
            setTitle("Nuevo Proyecto");
    }
    return(
    <main className={className}>
        <Title titulo={getTitle}/>
        <section className="section">
            <FormData get={columns} data={get} set={set} setTitle={setTitle}/>
            <div className="tableContainer">
                <Table columns={columns} data={row}/>
            </div>
        </section>
    </main>)
}