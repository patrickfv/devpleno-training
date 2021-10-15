import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'

const minYear = 2020
const maxYear = 2024

const AddMonth = () => {
    const refYear = useRef(null)
    const refMonth = useRef(null)
    const [redir, setRedir] = useState('')
    const years = []
    const months = []

    const zeroPad = num => {
        return (num < 10) ? '0'+num : num
    }
    const showMonth = () => {
        setRedir(refYear.current.value + '-' + zeroPad(refMonth.current.value))
    }

    for(let index = minYear; index <= maxYear; index++) {
        years.push(index)
    }
    for(let index = 1; index <= 12; index++) {
        months.push(index)
    }
    
    if(redir) {
        return <Redirect to={'movimentacoes/'+redir} />
    }
    return (
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <select ref={refYear}>
                {
                    years.map(year => {
                        return <option key={year} value={year}>{year}</option>
                    })
                }
            </select>
            <select className="ml-2" ref={refMonth}>
                { 
                    months.map(month => {
                        return <option key={month} value={month}>{zeroPad(month)}</option>
                    })
                }
            </select>
            <button className="ml-2 btn btn-primary text-uppercase" onClick={showMonth}>Adicionar</button>
        </React.Fragment>
    )
}

export default AddMonth
