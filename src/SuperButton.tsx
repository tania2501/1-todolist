import React from 'react';
import { FilterValuesType } from './AppWithRedux';

type ButtonType = {
  title: string
  onclick: ()=>void
  filterType: FilterValuesType
}

export const SuperButton = (props: ButtonType) => {
  
  return (
    <div>
      <button 
        onClick={props.onclick} className={props.filterType === props.title ? 'active-filter' : 'superButton'}> {props.title}</button>
    </div>
  )
}