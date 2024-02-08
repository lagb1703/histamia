import { Card } from "../../componenetes/card/card"
import { useContext } from "react";
import { globalContext } from "../../context/globalContext";
import { v4 as uuidv4 } from 'uuid';
import "./history.css";
export function HistoryPage({className}){
    const {getCards} = useContext(globalContext);
    return(
        <main className={className}>
            <div className="cardsContainer">
                <ul className="cards">
                    {
                        getCards.map((item)=>{
                            return <Card key={uuidv4()} nombre={item.nombre} mediana={item.mediana} moda={item.moda} media={item.media} />;
                        })
                    }
                </ul>
            </div>
        </main>
    )
}