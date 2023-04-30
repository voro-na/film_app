import React, { useCallback, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import './input.scss'

const Input = (): JSX.Element => {
  const [input, setInput] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent): void => {
    e.preventDefault()
    const link = `v2.2/films?order=NUM_VOTE&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${input}&page=1`
    if (input !== '') {
      navigate('/movies', { state: { link } })
      setInput('')
    }
  }, [input])

  return <form className={'form'} onSubmit={
    useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<Element, MouseEvent>) => {
      handleSubmit(e)
    }, [])}>
    <div className="form_input-container">
      <input type="text"
             value={input}
             className="form_input"
             placeholder="Введите название фильма"
             onChange={useCallback((e: { target: { value: React.SetStateAction<string> } }) => {
               setInput(e.target.value)
             }, [])}/>
      <Link to={'/search'}>
        <i className="fa-solid fa-bars icons"></i>
      </Link>
      <i className="fa-solid fa-magnifying-glass icons"
         onClick={useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<Element, MouseEvent>) => {
           handleSubmit(e)
         }, [])}></i>
    </div>
  </form>
}

export default React.memo(Input)
