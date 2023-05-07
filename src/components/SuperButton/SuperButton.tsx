import React from 'react';
import { FilterValuesType } from '../../pages/TodolistsLists/Todolist/todolists-reducer';



type ButtonType = {
  title: string
  onclick: ()=>void
  filterType: FilterValuesType
}

export const SuperButton = React.memo((props: ButtonType) => {
  
  return (
    <div>
      <button 
        onClick={props.onclick} className={props.filterType === props.title ? 'active-filter' : 'superButton'}> {props.title}</button>
    </div>
  )
})