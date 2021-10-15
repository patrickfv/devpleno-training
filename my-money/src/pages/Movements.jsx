import React, { useState, useEffect } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-a586c.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Movements = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMonth = useGet(`meses/${match.params.data}`)
    const [dataPatch, patch] = usePatch()
    const [postData, save] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, remove] = useDelete()
    const [describe, setDescribe] = useState('')
    const [value, setValue] = useState(0.0)

    const onChangeDescribe = ({ target }) => {
        setDescribe(target.value)
    }
    const onChangeValue = ({ target }) => {
        setValue(target.value)
    }
    const saveMovement = async () => {
        if(value && describe.length) {
            await save({
                descricao: describe,
                valor: parseFloat(value)
            })
            setDescribe('')
            setValue(0.0)
            await sleep(1000)
            data.refetch()
            dataMonth.refetch()
        }
    }
    const removeMovement = async id => {
        await remove(`movimentacoes/${match.params.data}/${id}`)
        await sleep(1000)
        data.refetch()
        dataMonth.refetch()
    }
    const changeForecast = ({ currentTarget }) => {
        if(!currentTarget.value) return
        var sendPatch = {}
        switch(currentTarget.alt) {
            case 'input_forecast':
                sendPatch.previsao_entrada = parseFloat(currentTarget.value)
                break
            case 'exit_forecast':
                sendPatch.previsao_saida = parseFloat(currentTarget.value)
                break
            default:
                console.warn(`${currentTarget} not supported`)
        }

        patch(`meses/${match.params.data}`, sendPatch)
    }
    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

    useEffect(() => {
        dataMonth.refetch()
    }, [dataPatch])

    return (
      <div className="text-uppercase">
        <h1>Movimentações</h1>
        { data.loading && <div>Carregando...</div> }
        { dataMonth.data && <div>
            <span className="font-weight-bold">
                Entradas: { dataMonth.data.entrada } / Saidas: { dataMonth.data.saida }
            </span>
            <div className="d-flex">
                <div>
                    <span>
                        Previsão de entrada: { dataMonth.data.previsao_entrada } 
                    </span>
                    <input className="ml-2" type="number" alt="input_forecast" onBlur={changeForecast} />
                </div>
                <div className="ml-2">
                    <span>
                        Previsão de saida: { dataMonth.data.previsao_saida }
                    </span>
                    <input className="ml-2" type="number" alt="exit_forecas" onBlur={changeForecast} />
                </div>
            </div>
        </div>
        }
        <table className="table mt-2">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col" className="text-right">Valor</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.data && Object.keys(data.data).map(each => {
                        return (
                            <tr key={each}>
                                <th>{data.data[each].descricao}</th>
                                <th className="text-right">{data.data[each].valor}
                                <button className="btn btn-danger ml-2" onClick={() => removeMovement(each)}>-</button>
                                </th>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
            <div className="">
                <input type="text" value={describe} onChange={onChangeDescribe}/>
                <input className="ml-2" type="number" value={value} onChange={onChangeValue}/>
                <button className="btn btn-success ml-2" onClick={saveMovement}>+</button>
            </div>
      </div>
    )
}

export default Movements