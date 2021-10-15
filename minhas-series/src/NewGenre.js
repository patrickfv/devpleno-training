import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewGenre = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = (event) => {
        setName(event.target.value)
    }
    const save = () => {
        axios.post('/api/genres', {
            name,
        })
        .then((res) => {
            setSuccess(true)
        })
    }
    if(success) {
        return <Redirect to='/generos' />
    }
    
    return (
        <div className='container'>
        <h1>Novo Genêro</h1>
            <form>
                <div className='form-group'>
                    <label htmlfor='name'>Nome</label>
                    <input type='text' value={name} {...{onChange}} class='form-control' id='name' aria-describedby='emailHelp' placeholder='nome do genêro'/>
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default NewGenre
