import React, {useState} from 'react';

import { isEmpty, size } from 'lodash';
import shortid from 'shortid';

export function App(){
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])
  const [editTareas, setEditTareas] = useState(false)
  const [id, setId] = useState()

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

  const deleteTarea = (id) => {
    const filterTareas = tareas.filter(tarea => tarea.id !== id)
    setTareas(filterTareas)
  }

  const editTarea = (theTarea) => {
    setTarea(theTarea.name)
    setEditTareas(true)
    setId(theTarea.id)
  }

  const guardarTarea = (event) => {
    event.preventDefault();
    if (isEmpty(tarea)){
      console.log('Tarea Vacia')
      return
    }
    
    const editedTarea = tareas.map(item => item.id === id ? {id, name: tarea} : item)
    setTareas(editedTarea)
    setEditTareas(false)
    setTarea("")
    setId("")
  }
  return (
    <div className="container mt-5">
        <h1 className="text-center">Tareas</h1>
        <hr/>
        <div className="row">
          <div className="col-6">
            <h4 className="text-center">Lista de Tareas</h4>
            {
              size(tareas) == 0 ? (
                <h5 className="text-center">No hay Tareas </h5>
              ) : (

                <ul className="list-group">
                  {
                    tareas.map((tarea) => (
                      <li className="list-group-item" key={tarea.id}>
                        <span className="lead">{tarea.name}</span>
                        <button 
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => deleteTarea(tarea.id)}>
                            Eliminar
                        </button>

                        <button 
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editTarea(tarea)}>
                            Editar
                        </button>
                      </li>
                    ))
                  } 
                </ul>
              )  
            }
          </div>
          <div className="col-6">
            <h4 className="text-center">{editTareas ? "Modificar" : "Guardar"}</h4>
            <form onSubmit={ editTareas ? guardarTarea : addTarea }>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Ingrese la tarea" 
                onChange={(text) => setTarea(text.target.value)}
                value={tarea}
              />
              <button 
                className={editTareas ? "btn btn-warning btn-block": "btn btn-dark btn-block"} 
                type="submit">
                  {editTareas ? "Guardar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>

        
    </div>
  );
}


