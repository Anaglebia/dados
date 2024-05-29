import { useState } from 'react';
import Swal from "sweetalert2";
import "../index.css";

const Adicionar = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [clinica, setClinica] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Favor preencher todos os campos!'
            })
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Favor preencher os dados corretamente!'
            })
        } else if (text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Favor preencher a data corretamente!'
            })
        } else {
            onSave({ text, day , especialidade,clinica});
        }
        setText('');
        setDay('');
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Nome</label>
                <input type="text" placeholder="Nome" value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div className="form-control">
                <label>Data da consulta</label>
                <input type="dete" placeholder="Data" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Especialidade</label>
                <input type="text" placeholder="Especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Clinica</label>
                <input type="text" placeholder="Clinica" value={clinica} onChange={(e) => setClinica(e.target.value)} />
            </div>
            <input type="submit" className="btn btn-block" value="Salvar agendamento" />
        </form>
    )
}
export default Adicionar;