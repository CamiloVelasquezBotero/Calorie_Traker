import type { Activity } from '../types'

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity:Activity } } | /* Guardara la actividad */
    { type: 'set-activeId', payload: { id:Activity['id'] } } | /* Este establecera el ID a editar */
    { type: 'delete-activity', payload: {id:Activity['id']} } | /* Para eliminar solo necesitamso el ID */
    { type: 'restart-app' } /* Con esta reiniciaremos la app */

export type ActivityState = {
    activities: Activity[],
    activeId:Activity['id']
}

const localStorageActivities = ():Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : [] /* Si tenemos algo entonces lo devolvemos si no lo dejamos un arreglo vacio  */
}

export const initialState:ActivityState = {
    activities: localStorageActivities(), /* Llamamos al localStorage */
    activeId: ''
}

export const activityReducer = (state:ActivityState = initialState, action:ActivityActions) => {
    if(action.type === 'save-activity') {
        /* Este codigo maneja la logica del reducer para actualizar el state */
        let updatedActivites:Activity[] = []
        if(state.activeId) { /* sI tenemos algo significa que estamos editando */
            updatedActivites = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity /* Editamos y le pasamos la nueva info */)
        } else { /* Si no estamos editando entonces guardamos una NUEVA */
            updatedActivites = [...state.activities, action.payload.newActivity] /* Y agregamos la nueva actividad */
        }

        return {
            ...state, /* Siempre se retorna la copia del state para no perder lo que ya se tiene */
            activities: updatedActivites,
            activeId: '' /* Cada que se agregue algo nuevo reseteamos el id para no editar mas */
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state, /* Siempre devolvermos una copia para no perder lo que ya tenemos */
            activeId: action.payload.id /* Le establecemos el nuevo id pasado por el payload */
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }
    
    return state
}