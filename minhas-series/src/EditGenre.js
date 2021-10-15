import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditGenre = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = (event) => {
        setName(event.target.value)
    }
    const save = () => {
        axios.put('/api/genres/'+match.params.id, {
            name,
        })
        .then((res) => {
            setSuccess(true)
        })
    }
    
    useEffect(() => {
        axios.get('/api/genres/'+match.params.id)
            .then((res) => {
                setName(res.data.name)
            })
    }, [match.params.id])
    if(success) {
        return <Redirect to='/generos' />
    }
    return (
        <div className='container'>
        <h1>Editar Genêro</h1>
            <form>
                <div class='form-group'>
                    <label htmlfor='name'>Nome</label>
                    <input type='text' value={name} {...{onChange}} class='form-control' id='name' aria-describedby='emailHelp' placeholder='nome do genêro'/>
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default EditGenre
