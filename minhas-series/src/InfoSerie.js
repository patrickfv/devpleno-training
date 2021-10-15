import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios.get('/api/series/'+match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
        })
    }, [match.params.id])

    useEffect(() => {        
        axios.get('/api/genres/')
            .then(res => {
                const genresCache = res.data.data
                setGenres(genresCache)
                const find = genresCache.find(value => data.genre === value.name)
                
                if(find) setGenreId(find.id)
        })
    }, [data.genre])
    
    const onChange = field => event => {
        if(field === 'genre') {
            setGenreId(event.target.value)
            return
        }
        setForm({...data, [field]: event.target.value})
    }

    const select = value => () => {
        setForm({ ...form, status: value })
    }
    
    const save = () => {
        axios.put('/api/series/'+match.params.id, {
            ...form,
            genre_id: genreId
        })
        .then(res => {
            console.log({
                ...form,
                genre_id: genreId
            });
            setSuccess(true)
        })
    }
    
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url(${data.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
    
    if(success) {
        return <Redirect to={'/series/'} />
    }
    
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0, 0, 0, 0.7)'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name}/>
                            </div>
                            <div className='col-8'>
                                <h1 className='text-white font-weight-light'>{data.name}</h1>
                                <div className='lead text-white'>
                                    { (data.status === 'ASSISTIDO') ? (<Badge color='success' style={{margin: 5}}>Assistido</Badge>) : (<Badge color='warning' style={{margin: 5}}>Assistir</Badge>) }
                                    Genêro: { data.genre } <br/>
                                    Comentários: { data.comments }
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')} style={{ margin: 5 }}>Editar</button>
            </div>
            {   (mode === 'EDIT') &&
                <div className='container'>
                <h1>Info Série</h1>
                
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' value={form.name || ''} onChange={onChange('name')} className='form-control' id='name' aria-describedby='emailHelp' placeholder='nome da série'/>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='name'>Comentários</label>
                            <input type='text' value={form.comments || ''} onChange={onChange('comments')} className='form-control' id='name' aria-describedby='emailHelp' placeholder='nome da série'/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Genêro</label>
                            
                            <select className='form-control' value={genreId} onChange={onChange('genre')}>
                                { genres.map( genre => <option key={genre.id} value={genre.id}>{ genre.name }</option>) }
                            </select>
                        </div>

                        <div className='form-check'>
                            <input defaultChecked className='form-check-input' type="radio" name='exampleRadios' id='exampleRadios1' value='assistido' onClick={select('ASSISTIDO')}/>
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>
                        <div className='form-check'>
                            <input defaultChecked={(data.status === 'ASSISTIR')} className='form-check-input' type='radio' name='exampleRadios' id='exampleRadios2' value='paraAssistir' onClick={select('ASSISTIR')}/>
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para Assistir
                            </label>
                        </div>  

                        <button onClick={save} type='button' className='btn btn-primary' style={{ margin: 5 }}>Salvar</button>
                        <button onClick={() => setMode('INFO')} type='button' className='btn btn-danger' style={{ margin: 5 }}>Cancelar Edição</button>
                    </form>
            </div>}
        </div>
    )
}

export default InfoSerie
