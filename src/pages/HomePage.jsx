import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
        <nav>
            <Link to="/register">register</Link>
            <br /> <hr />   
            <Link to="/login" >login</Link>

        </nav>
    </div>
  )
}
