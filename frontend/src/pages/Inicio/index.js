import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Row, Col, Button, Form, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import logo from '../../img/logo-500.png'
import './style.css';
import api from '../../services/api';
import Carregamento from '../Carregamento';

export default function Index() {

    const history = useHistory();

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [usuarios, setUsuarios] = useState([]);

    const [carregamento, setCarregamento] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude: lat, longitude: lng } = position.coords;
                setLatitude(lat);
                setLongitude(lng);
            }, erro => {
                console.log(erro)
            }, { timeout: 3000 });
        } else {
            alert('Browser não suporta serviço de geolocalização.');
        }
        setCarregamento(true)
        carregarUsuarios();
    }, [])

    function carregarUsuarios() {
        api.get('inicio/carregarUsuarios')
            .then(response => {
                console.log(response);
                if (response.status === 200) setUsuarios(response.data);
                setCarregamento(false);
            }).catch(err => {
                console.log(err);
                setCarregamento(false);
            });
    }

    const Mapa = withScriptjs(withGoogleMap(() => {
        return (
            <GoogleMap
                defaultZoom={14}
                center={{ lat: latitude, lng: longitude }}
                defaultCenter={{ lat: latitude, lng: longitude }} >
                <Marker position={{ lat: latitude, lng: longitude }} />

                {usuarios.map((usuario, i) => (
                    <div key={i}>
                        <Marker position={{ lat: usuario.latitude, lng: usuario.longitude }} />
                        <InfoWindow defaultZIndex={11} position={{ lat: usuario.latitude, lng: usuario.longitude }}>
                            <div>
                                <p style={{ fontSize: '1rem', margin: '0' }}>{usuario.tipo}</p>
                                <p style={{ margin: '0' }}><strong>Nome: </strong>{usuario.nome}<br></br>
                                    <strong>Email: </strong>{usuario.email}</p>
                            </div>
                        </InfoWindow>
                    </div>
                ))}
            </GoogleMap>


        )
    }));

    function submit(e) {
        e.preventDefault();
        setCarregamento(true);
        salvaLocalizacao();
    }

    function salvaLocalizacao() {
        api.put('inicio/salvarLocalizacao', { latitude, longitude })
            .then(response => {
                console.log(response);
                setCarregamento(false);
            }).catch(err => {
                console.log(err);
                setCarregamento(false);
            });
    }

    function desconectar() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <Carregamento carregamento={carregamento} />
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
                <Navbar.Brand href="#" className='ml-5'>
                    <img alt="DiaraEstá"
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                    />{' '}DiariaEstá
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto mr-5">
                        <Nav.Link onClick={desconectar}>Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid className='fundo-container escurece-fundo preencher-tela'>
                <Row className='mt-nav mx-3 mx-lg-0 '>
                    <Col lg='3' md='4' className='pt-2 px-4 mt-2 mb-2 pt-sm-4 bg-white informacoes-localizacao '>
                        <h5 >Sua localização</h5>
                        <Form onSubmit={submit}>
                            <Form.Row>
                                <Form.Group className='w-100' >
                                    <hr></hr>
                                    <Form.Label style={{ fontSize: '.8rem' }}>Latitude: {latitude}<br></br>
                                    Longitude: {longitude}</Form.Label>
                                    {/* <Form.Label style={{ fontSize: '.8rem' }}>Latitude: -15.9707938<br></br>
                                    Longitude: -83.9912740</Form.Label> */}
                                    <hr></hr>
                                </Form.Group>
                                <Button type='submit' className='w-100' onClick={e => e.target.blur()}>Salvar localização</Button>
                                <Form.Text className='py-3'>É necessário que você salve sua localização pelo menos uma vez para que diaristas ou empregadores lhe encontrem.</Form.Text>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col lg='9' md='8' className='my-auto pt-2 pb-2 pt-sm-2 pb-sm-2 mapa-container '>
                        {/* <Col lg='9' md='12'> */}
                        {/* <Mapa latitude={latitude} longitude={longitude} /> */}
                        <Mapa
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAkiCXj8T_z85hoIjd9y9jM44ebKqkhWP0"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `500px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )

}
            // AIzaSyAkiCXj8T_z85hoIjd9y9jM44ebKqkhWP0
