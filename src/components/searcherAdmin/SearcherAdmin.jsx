import { useState } from "react"
import "./SearcherAdmin.css"


export default function SearcherAdmin({onFiltrar}){
    const [texto, setTexto] = useState("")

    return (
      <>
        <div className="divSearcher">
          <input
            className="inputSearcher"
            placeholder="Nombre del Usuario"
            type="text"
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
            }}
          ></input>
          <button className="btn btn-primary" onClick={(e) => onFiltrar(texto)}>
            🔎 Buscar
          </button>
        </div>
      </>
    );
}