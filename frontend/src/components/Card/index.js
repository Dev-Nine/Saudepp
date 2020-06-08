import React from 'react'

import './styles.css'

import Notice from '../Notice'

export default function Card({title, type, data}) {
   return (
      <div>
         <h1 className="card-title">{title}</h1>
         <hr className="card-hr" />
         <ul className="card-list">
            <li className="card-item"><Notice /></li>
            <li className="card-item"><Notice /></li>
            <li className="card-item"><Notice /></li>
            <li className="card-item"><Notice /></li>
         </ul>
      </div>
   )
}