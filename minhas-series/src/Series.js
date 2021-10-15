import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
    const [data, setData] = useState([])
    const deleteGenre = id => {
        axios.delete('api/series/'+id)
        .then((res) => {
            setData(data.filter(item => item.id !== id))
        })
    }
    const renderLine = (record) => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenre(record.id)}>Remover</button>
                    <Link className='btn btn-warning' to={'/series/'+record.id} style={{marginLeft: 5}}>Info</Link>    
                </td>
            </tr>
        )
    }
    useEffect(() => {
        axios.get('/api/series')
        .then((res) => {
            setData(res.data.data)
        })
    }, [])

    if(data.length === 0) {
        return (
            <div>
                <Link style={{marginBottom: 5}} type='button' className='btn btn-primary' to='/series/novo'>Nova Série</Link>
                <div className="alert alert-warning" role="alert">
                    Você não possui Séries criadas!
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
        <h1>Séries</h1>
        <Link style={{marginBottom: 5}} type='button' className='btn btn-primary' to='/series/novo'>Nova Série</Link>
        <table className='table jumbotron'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(renderLine)}
            </tbody>
        </table>
        </div>
    )
}

export default Series
