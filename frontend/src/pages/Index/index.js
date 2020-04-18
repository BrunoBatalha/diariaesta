import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Container, Row, Col, Button, Card, Form, } from 'react-bootstrap';
import Carregamento from '../Carregamento';
import logo from '../../img/logo-500.png'
import './style.css';
import api from '../../services/api';

export default function Index() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [carregamento, setCarregamento] = useState(false);

    function submit(e) {
        e.preventDefault();
        setCarregamento(true);
        login();
    }

    function login() {
        api.post('login', { email, password: senha })
            .then(response => {
                console.log(response);
                if (response.status === 200) history.push('/inicio');
                else alert('Erro de autenticação');
                setCarregamento(false);
            }).catch(err => {
                console.log(err);
                alert('Erro de autenticação');
                setCarregamento(false);
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
            <Container fluid className='escurece-fundo  preencher-tela'>
                <Row className='mt-nav'>
                    <Col xs='12' sm='12' md='6' className='my-auto px-5 px-sm-5 px-md-4 text-center text-md-left'>
                        <p className='lead texto-dourado pl-md-5 '>
                            Em busca de um serviço?<br></br>Ou procurando uma diarista perto de sua casa?<br></br>
                            <strong>DiariaEstá</strong> é a maior plataforma para conseguir um serviço como diarista, ou contratar uma, junte-se à comunidade.
                        </p>
                        <Button className='ml-md-5' onClick={() => history.push('/cadastro')}>Cadastre-se</Button>
                    </Col>
                    <Col xs='12' sm='12' md='6' className='mt-4 pt-0 pb-5'>
                        <Card className='formulario-card mx-auto'>
                            <Card.Body>
                                <p className='mb-3 text-center'>
                                    <span>
                                        Acessar conta
                                    </span>
                                </p>
                                <Form onSubmit={submit}>
                                    <Form.Group className='py-2'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder='Digite seu email'
                                            required />
                                    </Form.Group>
                                    <Form.Group className='py-2'>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type='password'
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                            placeholder='Digite sua senha'
                                            required />
                                    </Form.Group>
                                    <Button type='submit' className='w-100'>
                                        Entrar
                                    </Button>
                                    <Form.Text>
                                        <Link to='#'>Esqueceu sua senha?</Link>
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