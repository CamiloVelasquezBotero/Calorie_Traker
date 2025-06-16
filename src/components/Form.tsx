import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from '../types'
import { categories } from "../data/categories"
import type { ActivityActions, ActivityState } from '../reducers/activity-reducer'

type FormProps = {
    dispatch: React.ActionDispatch<[action: ActivityActions]>,
    state: ActivityState
}

const initialState:Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state}:FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState) /* Inicializamos el state establecido */
    
    useEffect(() => {
        if(state.activeId) {
            /* .filter siempre devuelve un arreglo, entonces usamos la posicion [0] */
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    /* Hacemos una  funcion para manejar los 3 inputs */
    const handleChange = (e :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { /* Le establecemos el type al Evento */
        const isNumberField = ['category', 'calories'].includes(e.target.id) /* Si el evento incluye alguna de estas dos debe de ser number */
        
        setActivity({
            ...activity, /* copiamos los valores que ya teniamos para no perderlos y seguirlos copiando */
            [e.target.id]: isNumberField ? +e.target.value : e.target.value /* Convertimos a numero si es category o calories */
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity /* Extraemos solo name y calories para validarlos */
        return name.trim() !== '' && calories > 0 /* Solo se permitiran con esto */
    }

    const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({
            type: 'save-activity',
            payload: {
                newActivity: activity 
            }
        })

        setActivity({
            ...initialState,
            id: uuidv4() /* Creamos un nuevo id para no repetir el anterior */
        }) /* Reseteamos el state a su valor inicial */
    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select 
                id="category"
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                id="name"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de natanja, Ensalada, Correr, nadar, etc."
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input 
                id="calories"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Calorias Ej. 300 o 500"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase  text-white cursor-pointer disabled:opacity-10"
            value='Guardar Comida o Ejercicio'
            disabled={!isValidActivity()}
        />  

    </form>
  )
}
