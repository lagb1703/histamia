import "./nuevo.css";
import { Title } from "../../componenetes/title/title";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from "react";
import { useTableData } from "../../hooks/useTables";
import { Table } from "../../componenetes/tabla/tabla";
import { useFecthBackend, useResult } from "../../hooks/useFecth";

class magicWords{
    saveValue = "save"
    integerName = "Entero"
    integerValue = "entero"
    stringName = "Palabra"
    stringValue = "string"
    floatName = "punto flotante"
    floatValue = "float"
    maxInputTypeSize = 14
}

const magic = Object.freeze(new magicWords());

const types = [
    magic.stringName,
    magic.floatName,
    magic.integerName
]

const DISTRIBUCIONES = [
    {
        "nombre":"bernoulli",
        "data":[
            //"p"
        ]
    },
    {
        "nombre":"binomial",
        "data":[
            "n"
        ]
    },
    {
        "nombre":"hipergeometrica",
        "data":[
            "R",
            "N",
            "n"
        ]
    },
    {
        "nombre":"poisson",
        "data":[

        ]
    },
    {
        "nombre":"geometrica",
        "data":[

        ]
    },
    {
        "nombre":"pascal",
        "data":[
            "r"
        ]
    }
]

function Distributions( {name}){
    function handleClick(e){
        e.target.style.borderBlockColor = "grey";
    }
    function handleChange(e){
        let value = e.target.value;
        if(value === "")
            return
    }
    return(
        <li className="Event">
            <input onClick={handleClick} onChange={handleChange} type="text" placeholder={name}/>
        </li>
    )
}

function FormData({get, set, setTitle, data, info}){
    const [getDisableSelects, setDisableSelects] = useState(true);
    const [getFirstOption, setFirstOption] = useState("distribución");
    const [getFirstOptionValue, setFirstOptionValue] = useState("tipo valor");
    const [getData, setData] = useState([]);
    const title = useRef("");
    const setInfo = useResult(title);
    const navigateTo = useNavigate();
    useEffect(handleColumnActiveSelect, [get]);
    const {result, setDatos} = useFecthBackend();
    useEffect(()=>{
        setInfo(result);
        if(result != null)
            navigateTo("/medidas");
    }, [result]);
    function handleColumnActiveSelect(){
        if(get.length > 0){
            setDisableSelects(false);
            return;
        }
        setDisableSelects(true);
    }

    function handleChange(e){
        e.preventDefault();
        setFirstOption(e.target.value);
        setData(DISTRIBUCIONES.find((item)=>{
            return item.nombre === e.target.value;
        }).data)
    }

    function handleValor(e){
        setFirstOptionValue(e.target.value);
    }

    function handleTitleChange(e){
        let valor = e.target.value;
        if(valor.length > magic.maxInputTypeSize){
            e.target.value = valor.substring(0, magic.maxInputTypeSize);
            return;
        }
        setTitle(valor);
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
        let distribucion = e.target[5].value;
        let variables = {};
        const numeros = new RegExp("^[0-9]");
        if(distribucion === "distribución" | proyectName === "" || data === "" || columna === "Columna" || tipoValor === "Tipo Valor"){
            alert("te faltan rellenar datos");
            return;
        }
        for(let i = 6; i < e.target.length - 1; i++){
            let valor = e.target[i].value;
            let nombre = e.target[i].getAttribute("placeholder");
            if(valor === ""){
                e.target[i].style.borderBlockColor = "red";
                return;
            }
            if(!numeros.test(valor)){
                e.target[i].style.borderBlockColor = "red";
                return;
            }
            variables[nombre] = valor;
        }
        let datos = {
            "csvData":info,
            "jsonData":{
                "variable":variables.x,
                "columna_principal":columna,
                "distribucion":{
                    "tipo":distribucion,
                    "datos":variables
                }
            }
        }
        title.current = proyectName;
        setDatos(datos);
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
                <select onChange={handleValor}>
                    <option>{getFirstOptionValue}</option>
                    {types.map((item)=>{
                        if(item === getFirstOptionValue)
                            return <></>;
                        return(<option key={uuidv4()} value={item}>{item}</option>)
                    })}
                </select>
            </div>
            <div>
                <select onChange={handleChange}>
                    <option>{getFirstOption}</option>
                    {DISTRIBUCIONES.map((item)=>{
                        if(item.nombre !== getFirstOption)
                            return <option key={uuidv4()}>{item.nombre}</option>
                        else
                            return <></>
                    })}
                </select>
            </div>
            <ul className="EventContainer">
                <Distributions name="x" />
                {getData.map((item)=>{
                    return <Distributions name={item} key={uuidv4()}/>;
                })}
            </ul>
            <button>Calcular</button>
        </form>
    )
}

export function NuevoPage({className}){
    const [getTitle, setTitle] = useState("Nuevo proyecto");
    useEffect(handleTitleText, [getTitle]);
    const {set, get, columns, row, data} = useTableData(10);
    function handleTitleText(){
        if(getTitle === "")
            setTitle("Nuevo Proyecto");
    }
    return(
    <main className={className}>
        <Title titulo={getTitle}/>
        <section className="section">
            <FormData get={columns} data={get} set={set} setTitle={setTitle} info={data}/>
            <div className="tableContainer">
                <Table columns={columns} data={row}/>
            </div>
        </section>
    </main>)
}