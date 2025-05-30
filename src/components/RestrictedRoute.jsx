import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/auth/selectors'
import { Navigate } from 'react-router-dom'

export default function RestrictedRoute({element,direktGit ="/products"} ) {
    const isLoggedIn = useSelector(selectIsLoggedIn)
  return isLoggedIn ? <Navigate to={direktGit} /> : element
}
