import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewSerie = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = (event) => {
        setName(event.target.value)
    }
    const save = () => {
        axios.post('/api/series/', {
            name,
        })
        .then((res) => {
            setSuccess(true)
        })
    }
    if(success) {
        return <Redirect to='/series/' />
    }
    
    return (
        <div className='container'>
        <h1>Nova Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlfor='name'>Nome</label>
                    <input type='text' value={name} {...{onChange}} class='form-control' id='name' aria-describedby='emailHelp' placeholder='nome da série'/>
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default NewSerie
