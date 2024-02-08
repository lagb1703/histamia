import "./card.css"
export function Card({nombre, media, moda, mediana}){
    return(
    <li className="card">
        <div className="titleContainer">
            <h3>{nombre}</h3>
        </div>
        <div className="contentContainer">
            <div>
                <span>media: </span> 
                <span>{media}</span>
            </div>
            <div>
                <span>moda: </span>
                <span>{moda}</span>
            </div>
            <div>
                <span>mediana: </span>
                <span>{mediana}</span>                
            </div>
        </div>
    </li>)
}