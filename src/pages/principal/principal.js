import { Title } from "../../componenetes/title/title"
import "./principal.css";
export function Principal({className}){
    return(
        <section className={className}>
            <Title titulo="Histamia"/>
            <p className="parrafoPrincipal">La mejor pagina para crear tus estadisticas desde la web<br/>
            by <strong>Luis Alejandro Giraldo Bolaños</strong> DrLagb<br/>
            <strong>Diego</strong></p>
        </section>
    )
}