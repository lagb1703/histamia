import { LateralBar } from "./componenetes/lateralBar/lateralBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Principal } from "./pages/principal/principal";
import { NuevoPage } from "./pages/nuevo/nuevo";
import { MedidasPage } from "./pages/medidas/medidas";
import { OddsPage } from "./pages/probabilidad/probabilidad";
import { GraphicsPage } from "./pages/graficos/graphics";
import { HistoryPage } from "./pages/historial/history";
import { v4 as uuidv4 } from 'uuid';

const router = [
  {
    path: "/",
    element: <Principal className="second"/>,
  },
  {
    path: "/nuevo",
    element: <NuevoPage className="second"/>,
  },
  {
    path: "/medidas",
    element: <MedidasPage className="second"/>,
  },
  {
    path: "/probabilidades",
    element: <OddsPage className="second"/>,
  },
  {
    path: "/graficos",
    element: <GraphicsPage className="second"/>,
  },
  {
    path:"/historial",
    element: <HistoryPage className="second"/>
  }
];

function App() {
  return (
    <>
      <BrowserRouter>
        <LateralBar />
        <Routes>
          {router.map((i)=><Route key={uuidv4()} path={i.path} element={i.element}/>)}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
