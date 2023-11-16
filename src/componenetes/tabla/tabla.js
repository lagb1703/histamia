import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { v4 as uuidv4 } from 'uuid';

export function Table({columns, data}){
    const theme = useTheme([
        getTheme(),
        {
            Table: `
            --data-table-library_grid-template-columns:  ${columns.map(()=>`${100/columns.length}%`).join(" ")} minmax(150px, 1fr);
            `,
        },
    ]);
    if(columns.length < 2)
        return(<></>);
    const DATA = {"nodes":data};
    const COLUMNAS = columns.map((i)=>{
        return {
            label:i.name,
            renderCell: (item)=>item[i.name]
        }
    });
    return (<CompactTable key={uuidv4()} columns={COLUMNAS} data={DATA} theme={theme} layout={{ fixedHeader: true, horizontalScroll: true}}/>)
}