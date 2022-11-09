import DatosPresupuesto from "./DatosPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto"


const Header = ({
    presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto,
    gastos,setGastos,
}) => {
  return (
    <header>
        <h1> PLANIFICADOR DE GASTOS CON REACT </h1> 

        {isValidPresupuesto ? (
          <DatosPresupuesto 
            gastos={gastos}
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ):(
          <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}

    </header>
  )
}

export default Header