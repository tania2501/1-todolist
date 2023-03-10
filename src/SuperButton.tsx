import { Button } from '@mui/material';
import React, { useState } from 'react';
import { FilterValuesType } from './App';

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