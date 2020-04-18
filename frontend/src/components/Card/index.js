import React from 'react'

import './styles.css'

import Notice from '../Notice'

export default function Card({title, type, data}) {
   return (
      <div>
         <h1>{title}</h1>
         <hr />
         <ul>
            <li><Notice /></li>
            <li><Notice /></li>
            <li><Notice /></li>
            <li><Notice /></li>
         </ul>
      </div>
   )
}