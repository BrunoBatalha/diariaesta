import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { Navbar, Container, Row, Col, Button, Card, Form, } from 'react-bootstrap';

import Carregamento from '../Carregamento';
import logo from '../../img/logo-500.png'
import './style.css';
import api from '../../services/api';

export default function Index() {

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const [tipo, setTipo] = useState('Diarista');

    const [carregamento, setCarregamento] = useState(false);

    function submit(e) {
        e.preventDefault();
        if (senha === senha2) {
            setCarregamento(true);
            cadastro();
        } else
            alert('Senhas não coincidem');
    }

    function cadastro() {
        api.post('cadastro', { tipo, nome, email, password: senha })
            .then(response => {
                console.log(response);
                if (response.status === 201) history.push('/');
                setCarregamento(false);
            })
            .catch(err => {
                setCarregamento(false);
                console.log(err);
            });
    }

    return (
        <>
            <Carregamento carregamento={carregamento} />
            <Navbar bg="dark" variant="dark" fixed="top" >
                <Navbar.Brand href="#" className='ml-5'>
                    <img alt="DiaraEstá"
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                    />{' '}DiariaEstá
                </Navbar.Brand>
            </Navbar>
            <Container fluid className='escurece-fundo'>
                <Row className='mt-nav pb-4'>
                    <Col>
                        <Card className='formulario-card mx-auto'>
                            <Card.Body>
                                <p className='mb-3 text-center'>
                                    <span>
                                        Nova Conta
                                    </span>
                                </p>
                                <Form.Text className="text-muted text-center">ATENÇÃO: Nenhuma informação poderá ser alterada depois.</Form.Text>
                                <Form onSubmit={submit}>
                                    <Form.Group className='py-2'>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Ex.: Bruno Batalha...'
                                            onChange={e => setNome(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Form.Group className='py-2'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Ex.: bruno@gmail.com...'
                                            onChange={e => setEmail(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Form.Group className='py-2'>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Digite sua senha'
                                            onChange={e => setSenha(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Form.Group className='py-2'>
                                        <Form.Label>Confirmar senha</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Digite sua senha'
                                            onChange={e => setSenha2(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control as="select" custom onChange={e => setTipo(e.target.value)} value={tipo}>
                                            <option>Diarista</option>
                                            <option>Empregador(a)</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' className='w-100'>
                                        Cadastrar
                                    </Button>
                                    <Form.Text className='text-center'>
                                        <Link to='/'>Voltar</Link>
                                    </Form.Text>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )

}