import React, { createContext, useContext, useEffect, useState }from 'react';
import api from '../services/api';
import history from '../pages/history.js';

const Context = createContext();


function AuthProvider( {children} ) {
    
   
    const [autorizacao, setAutorizacao ] = useState(false);
    const [loading, setLoading ] = useState(true)

    useEffect(() =>{
        const token = localStorage.getItem('token');
     
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAutorizacao(true)
        }
        
        setLoading(false)
    }, [])

        async function ValidacaoLogin(email, password){
            const envEmail = email
            const envSenha = password
            const { data: { token, user } } = await api.post('/login',{
               email: envEmail,
               password: envSenha
            })
            
            localStorage.setItem('token', JSON.stringify(token));

            api.defaults.headers.Authorization = `Bearer ${token}`;
            if(user[0].id_tipo_login === 1){
                setAutorizacao(true);
                history.push('/pesqinstituicao');
            }
            else if(user[0].id_tipo_login === 2){
                setAutorizacao(true);
                history.push('/professorhome')
            }
            else if(user[0].id_tipo_login === 3){
                setAutorizacao(true);
                history.push('/alunohome')
            }
     
        }
   


        function logout(){
            setAutorizacao(false)
            localStorage.removeItem('token')
            localStorage.removeItem('ProfessorOuAdministrador')
            localStorage.removeItem('turma')
            localStorage.removeItem('semestreProfessor')
            localStorage.removeItem('anoProfessor')
            localStorage.removeItem('disciplinaProfessor')
            api.defaults.headers.Authorization = undefined;
            history.push('/login')
        }



    return(
        <Context.Provider value={{ autorizacao, ValidacaoLogin, logout, loading }}>
            {children}
        </Context.Provider>
    )
}



export { Context, AuthProvider };