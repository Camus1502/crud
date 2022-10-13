import React, {useState} from 'react';

import { isEmpty } from 'lodash';
import shortid from 'shortid';

export function App(){
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])

  const addTarea = (event) => {
    event.preventDefault();
    if (isEmpty(tarea)){
      console.log('Tarea Vacia')
      return
    }
    const newTarea = {
      id: shortid.generate(),
      name: tarea
    }

    setTareas([...tareas, newTarea])
      setTarea("")
  }
  return (
    <div className="container mt-5">
        <h1 className="text-center">Tareas</h1>
        <hr/>
        <div className="row">
          <div className="col-6">
            <h4 className="text-center">Lista de Tareas</h4>
            <ul className="list-group">
              {
              tareas.map((tarea) => (
                  <li className="list-group-item" key={tarea.id}>
                    <span className="lead">{tarea.name}</span>
                    <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                    <button className="btn btn-warning btn-sm float-right">Editar</button>
                  </li>
              ))
              
              }    
            </ul>
          </div>
          <div className="col-6">
            <h4 className="text-center">Formulario</h4>
            <form onSubmit={(addTarea) }>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Ingrese la tarea" 
                onChange={(text) => setTarea(text.target.value)}
                value={tarea}
              />
              <button className="btn btn-dark btn-block" type="submit">Agregar</button>
            </form>
          </div>
        </div>

        
    </div>
  );
}


