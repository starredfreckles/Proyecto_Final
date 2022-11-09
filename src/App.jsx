import { useState, useEffect } from 'react'
import Header from './componentes/Header';
import Filtros from './componentes/Filtros';

import IconoNuevoGasto from './img/nuevo-gasto.svg'

import Modal from './componentes/Modal';
import ListadoGastos from './componentes/ListadoGastos';

import {generarID} from './helpers/index';

//----------Musiquita

window.addEventListener("load",function(){
	document.getElementById("play").addEventListener("click",reproducirmusica);
	document.getElementById("stop").addEventListener("click",pausarmusica);			
});

function reproducirmusica(){
	var sonido = document.createElement("iframe");
	sonido.setAttribute("src","https://www.youtube.com/embed/_0LKM7kkqXs?autoplay=1");
	document.body.appendChild(sonido);
	document.getElementById("play").removeEventListener("click",reproducirmusica);
}

function pausarmusica(){
	var iframe = document.getElementsByTagName("iframe");

	if (iframe.length > 0){
		iframe[0].parentNode.removeChild(iframe[0]);
		document.getElementById("play").addEventListener("click",reproducirmusica);
	}
}

//----------Inician funciones principales

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))  ?? 0
  );  

  
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)


  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => { 
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
  
      setTimeout(() => { 
        setAnimarModal(true);
      },400)
    }
  },[gastoEditar]);

  useEffect(() => { 
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    console.log('Presupuesto localstorage',presupuestoLS)

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }

  },[])

  useEffect(() => { 
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  },[presupuesto]);

  useEffect(() => { 
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? [])
  },[gastos]);

  useEffect(() => { 
    if(filtro){
//----Filtrado por categoría
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      console.log(gastosFiltrados)
      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro])
  //----------------------------------------------------------------------------
  const handleNuevoGasto = () => { 
    setModal(true);
    setGastoEditar({})

    setTimeout(() => { 
      setAnimarModal(true);
    },400)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map(gastoOriginal => gastoOriginal.id === 
        gasto.id ? gasto : gastoOriginal)

      setGastos(gastosActualizados);
      setGastoEditar({});

    }else{
      // Nuevo
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto]);
    }
    setModal(false);
    setTimeout(() => { 
      setAnimarModal(false);
    },400)
  }

  const eliminarGasto = (id) => { 
    console.log('Eliminando',id);
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados);
  }

  //-----------------------------------------------------------------------------

  return (
    <div className={modal ? 'fijar':''}>
      <Header
      setGastos={setGastos}
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
    />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

    </div>
    
  )
}

export default App