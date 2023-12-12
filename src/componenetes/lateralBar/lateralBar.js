import {BsDice1} from "react-icons/bs";
import {BiRuler} from "react-icons/bi";
import {MdOutlineWatchLater} from "react-icons/md";
import {AiOutlinePlusCircle} from "react-icons/ai"
import { PageIcon } from "../Icon/icon";
import { GrGraphQl } from "react-icons/gr";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./lateral.css";

const links = [
    {
        url:"/",
        simbol:PageIcon,
        name: "histamia"
    },
    {
        url:"/nuevo",
        simbol:AiOutlinePlusCircle,
        name: "nuevo"
    },
    {
        url:"/historial",
        simbol:MdOutlineWatchLater,
        name: "historial"
    },
]

const medidas = [
    {
        url:"/medidas",
        simbol:BiRuler,
        name: "medidas"
    },
    {
        url:"/probabilidades",
        simbol:BsDice1,
        name: "probabilidades"
    },
    {
        url:"/graficos",
        simbol:GrGraphQl,
        name: "graficos"
    },
]

function LiItem(promp){
    return (
        <li>
            <Link to={promp.url}>
                <promp.simbol />
                <span>{promp.name}</span>
            </Link>
        </li>
        )
}

export function LateralBar(){
    return (<header className="header">
        <ul className="hotbar">
            {links.map((item)=>{
                return <LiItem key={uuidv4()} url={item.url} name={item.name} simbol={item.simbol}/>
            })}
        </ul>
        <ul className="hotbar">
            {medidas.map((item)=>{
                return <LiItem key={uuidv4()} url={item.url} name={item.name} simbol={item.simbol}/>
            })}
        </ul>
    </header>)
}