import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { TodolistsAPI } from '../api/todolists-api';

export default {
   title: 'API/Todolists'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      TodolistsAPI.getTodolists()
           .then( (res) => {
             setState(res.data)
           })
 
   }, [])
   return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      TodolistsAPI.createTodolist('tania', )
      .then( (res) => {
        setState(res.data)
      })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = 'acd42cb9-bdb6-444b-bea9-2b87cc2eb076'
    TodolistsAPI.deleteTodolist(todolistId)
           .then( (res) => {
             setState(res.data)
           })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = '84494569-1990-4e41-9c7b-bff2d6122633'
    TodolistsAPI.updateTitle('tatata', todolistId)
      .then( (res) => {
        setState(res.data)
      })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

