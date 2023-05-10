import React, {FormEvent, useCallback, useState} from 'react'

import './authenticationForm.scss'

interface AuthenticationFormProps {
    title: string
    handleClick: any
    message: string
}

const AuthenticationForm = ({
                                title,
                                handleClick,
                                message
                            }: AuthenticationFormProps): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
        handleClick(email, password)
    }, [email, handleClick, password])
    return <>
        <h2 className={'title'}>{title}</h2>
        <h3>{message}</h3>
        <form className={'authentication-form'} onSubmit={(e) => handleSubmit(e)}>
            <input type="email"
                   value={email}
                   placeholder="Введите email"
                   className={'form_input-container '}
                   onChange={(e) => {
                       setEmail(e.target.value)
                   }}/>
            <input type="password"
                   value={password}
                   placeholder="Введите пароль"
                   className="form_input-container "
                   onChange={(e) => {
                       setPassword(e.target.value)
                   }}/>
            <button
                onClick={(e) => handleSubmit(e)}
                className={'register_btn'}>
                {title}
            </button>
        </form>
    </>
}

export default React.memo(AuthenticationForm)
