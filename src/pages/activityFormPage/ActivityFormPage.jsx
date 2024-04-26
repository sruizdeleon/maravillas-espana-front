import React from 'react'
import ActivityForm from '../../components/forms/activityForm/ActivityForm'
import './ActivityFormPage.css'

const ActivityFormPage = () => {



  return (
    <section className='page'>
      <div className='activity-fomr__contianer'>
        <h1 className='activity-form__title'>Formulario de actividad</h1>
        <ActivityForm></ActivityForm>
      </div>
    </section>
  )
}

export default ActivityFormPage
