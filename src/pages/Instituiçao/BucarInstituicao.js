import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../Components/administrador/header/header.js';
import Container from '../../Components/ContainerList/containerlist.js';
import './BuscarInstituicao.css';
import { ContextInstituicao } from '../../Context/InstituicaoContext'
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'



export default function BuscarInstituicoes() {

    const { SaveID, id } = useContext(ContextInstituicao)

    const [i, setI] = useState(0);
    const [instituicao, setInstituicao] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [pesq, setPesq] = useState('');



    useEffect(() => {

        async function BuscarAll() {
            const response = await api.get(`/instituicao/${1}`)
            setInstituicao(response.data)
            setTotalPage(response.headers.count);
        };

        BuscarAll();


    }, []);
 

    useEffect(() => {
        let paginacao = totalPage / 5;
        console.log(paginacao)

        let Numeracao = totalPage % 5 === 0;
        if (Numeracao === false) {
            let salve = paginacao + 1
            paginacao = Math.round(salve)
        }
        console.log(paginacao)
        setI(paginacao)

    }, [totalPage])

    async function nextInstituicao() {

        console.log(i)
        if (page < i) {
            let next = await page + 1;
            setPage(next);
            const response = await api.get(`/instituicao/${next}`)
            console.log('ok')
            setInstituicao(response.data)
        } else if (page === i) {
            alert('Já Chegou no Final')
        }
    }

    async function PrevInstituicao() {
        console.log(page)
        if (page === 1) {
            return alert('inicio')
        } else {
            let prev = await page - 1;
            setPage(prev);
            const response = await api.get(`/instituicao/${prev}`)
            setInstituicao(response.data)
        }
    }

   


    return (
        <>
            <Menu />
            <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Instituições</p>
                    </div>
                </div>
            </div>
            <section className="list-instituicao-all-bg  display-none-desktop">
            <div >
                <table >
                    <tr >
                        <th scope="col">
                            Código
                        </th>
                        <th scope="col">
                            Nome Instituição
                        </th>
                        <th scope="col">
                            Unidade
                        </th>
                        <th scope="col">
                            Responsável
                        </th>
                        <th scope="col">
                            Editar / Visualizar
                        </th>
                    </tr>


                    {instituicao.map(instituicao => (
                        <tr>
                            <th>{instituicao.id_instituicao}</th>
                            <td>{instituicao.nome_instituicao}</td>
                            <td>{instituicao.unidade}</td>
                            <td>{instituicao.responsavel}</td>
                            <td>
                                <a
                                    onClick={() => SaveID(instituicao.id_instituicao)}>
                                    <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                                </a>
                            </td>
                        </tr>


                    ))}


                </table>
            </div>

            <div className="bg-footer">

                <div className="flex-next-prev-list">
                    <button
                        onClick={() => PrevInstituicao()}
                        className="back-button-list-all btn-list-color-voltar">
                        Voltar
                     </button>
                    <button onClick={() => nextInstituicao()}
                        className="back-button-list-all btn-list-color-proximo">
                        Próximo
                        </button>
                </div>
            </div>
        </section>

            <section className=" diplay-none-mobile">
                {instituicao.map(instituicao => (
                    <div className="mobile-table">
                        <div>
                            <p><strong>Código: </strong>{instituicao.id_instituicao}</p>
                        </div>
                        <div>
                            <p><strong>Nome Instituição:</strong> {instituicao.nome_instituicao}</p>
                        </div>
                        <div>
                            <p><strong>Unidade:</strong> {instituicao.unidade}</p>
                        </div>
                        <div>
                            <p><strong>Responsável:</strong> {instituicao.responsavel}</p>
                        </div>
                        <div className="editar-instituicao-mobile">
                            <p className="border-none-instituicao">
                                <strong>Editar / Visualizar:  </strong>
                            </p>
                            <a
                                onClick={() => SaveID(instituicao.id_instituicao)}>
                                <FontAwesomeIcon icon={faEdit} size="lg" color="#0060EB" />
                            </a>
                        </div>
                    </div>
                ))}
                <div className="mobile-teste-global">
                    <div className="bg-footer">
                        <div className="flex-next-prev-list">
                            <button
                                onClick={() => PrevInstituicao()}
                                className="back-button-list-all btn-list-color-voltar">
                                Voltar
                        </button>
                            <button
                                onClick={() => nextInstituicao()}
                                className="back-button-list-all btn-list-color-proximo">
                                Próximo
                        </button>
                        </div>
                    </div>
                </div>


            </section>





        </>
    );
}