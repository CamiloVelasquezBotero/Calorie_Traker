import { useReducer, useEffect, useMemo } from 'react'
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import CalorieTraker from './components/CalorieTraker'
import { useScrollToView } from './hooks/useScrollToView' /* Hook personalizado para hacer scroll en el dom */

function App() {
  const [ state, dispatch ] = useReducer(activityReducer, initialState) /* Nos devolvera el estado del reducer y el dispatch para ejecutar las acciones */
  const [sectionRef, scrollToSection] = useScrollToView<HTMLElement>()

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities)) /* Creamos en el localStorage  */
  }, [state.activities]) /* Guardamos las actividades en el localStorage cada que se actualice el state */

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities]) /* Verificamos si hay actividades */

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador De Calorias</h1>

          <button
            className='bg-gray-800 hover:bg-gray-900 p-2 font-bold  uppercase text-white cursor-pointer rounded-lg  text-sm disabled:opacity-10'
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >Reiniciar App</button>
        </div>
      </header>

      <section 
        className="bg-lime-500 py-20 px-5"
        ref={sectionRef}
      >
        <div className="max-w-4xl mx-auto -mt-10">
          <p
            className={`transition-all duration-300 p-1 bg-sky-900 text-white inline-block rounded-lg ml-10 font-bold
              ${state.activeId ? "opacity-100 translate-y-0 pointer-events-auto mb-2" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            Editando!...
          </p>
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTraker 
            activities={state.activities}
          />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
          scrollToSection={scrollToSection}
        />
      </section>
    </>
  )
}

export default App
