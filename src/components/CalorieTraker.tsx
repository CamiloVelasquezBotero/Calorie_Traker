import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"
type CalorieTrakerProps = {
    activities:Activity[]
}

export default function CalorieTraker({activities}:CalorieTrakerProps) {

    // Contadores
    const caloriesConsumed = useMemo(() =>  /* Hacemos el total de calorias consumidas */
        activities.reduce((total, activity) => activity.category === 1 ? total+activity.calories : total, 0), [activities])
    const caloriesBurned = useMemo(() =>  /* Calorias quemadas en Ejercicio */
        activities.reduce((total, activity) => activity.category === 2 ? total+activity.calories : total, 0), [activities])
    const netCalories = useMemo(() =>  /* Hacemos la diferencia de las calorias*/
        caloriesConsumed - caloriesBurned, [activities])

  return ( 
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen De Calorias</h2>
        
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">

            <CalorieDisplay 
                calories={caloriesConsumed}
                text='Consumidas '
            />
            <CalorieDisplay 
                calories={caloriesBurned}
                text='Ejercicio '
            />
            <CalorieDisplay 
                calories={netCalories}
                text='Diferencia '
            />
            
        </div>
    </>
  )
}
