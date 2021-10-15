import { Link } from 'react-router-dom'
import Rest from '../../utils/rest'

const baseURL = 'https://mymoney-a586c.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Months = () => {
    const data = useGet('meses')     

    if(data.loading) { 
        return <span>Carregando...</span>
    }

    return (
        <table className="table mt-2 text-uppercase">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Mês</th>
                    <th scope="col">Previsão entrada</th>
                    <th scope="col">Entrada</th>
                    <th scope="col">Previsão saída</th>
                    <th scope="col">Saída</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(data.data).map(month => {
                        return (
                            <tr key={month}>
                                <th scope="col"><Link to={`/movimentacoes/${month}`}>{month}</Link></th>
                                <th>{data.data[month].previsao_entrada}</th>
                                <th>{data.data[month].entrada}</th>
                                <th>{data.data[month].previsao_saida}</th>
                                <th>{data.data[month].saida}</th>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Months