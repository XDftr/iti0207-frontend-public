import React, {useEffect, useState} from "react";

import "bootstrap/dist/css/bootstrap.css";
import {Button, Card, ListGroup, Modal, Table} from "react-bootstrap";
import '../assets/styles/KoikParkimiskohad.css';
import API, {getToken} from '../services/api';
import Navbar from "../components/layout/navigation/Navbar";

export default function KoikParkimiskohad() {
    const [show, setShow] = useState(false);
    const conf = {
        headers: { Authorization: `Bearer ${getToken()}` }
    };
    const [details, setDetails] = useState({
        parkimiskohaKood: null,
        parklaKood: null,
        koordinaadidPikkus: null,
        koordinaadidLaius: null,
        parkimiskohaKommentaar: null,
        registreerijaEMeil: null,
        registreerijaPerenimi: null,
        registreerijaEesnimi: null,
        parkimiskohaRegaeg: null,
        pinnakatte: null,
        parklaNimi: null
    });
    const [posts, setPosts] = useState({blogs: []});
    const [category, setCategory] = useState({blogs: []});
    const handleClose = () => setShow(false);

    async function handleShow(a) {
        const details = await API.get('api/private/parkimiskoht/detailid/' + a, conf)
        const categories = await API.get('api/private/parkimiskoht/kategooriad/' + a, conf)
        console.log(details)
        console.log(categories)

        console.log(categories.data)
        setCategory({blogs: categories.data})

        setDetails(details.data)
        setShow(true)
    }

    useEffect(() => {
        async function getIsik() {
            const response = await API.get('api/private/parkimiskoht/leia_koik', conf)
            setPosts({blogs: response.data})
            console.log(response)
        }

        getIsik()

    }, [])

    return (
        <div className="Isik">
            <Navbar />
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Parkimiskoha detailid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Parkimiskoha kood:</div>
                                    {details.parkimiskohaKood}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Parkla kood:</div>
                                    {details.parklaKood}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Parkla nimi:</div>
                                    {details.parklaNimi}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Pikkus (koordinaadid):</div>
                                    {details.koordinaadidPikkus}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Laius (koordinaadid):</div>
                                    {details.koordinaadidLaius}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Kommentaar:</div>
                                    {details.parkimiskohaKommentaar}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Pinnakatte:</div>
                                    {details.pinnakatte}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Registreerimise aeg:</div>
                                    {details.parkimiskohaRegaeg}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    <div className="fw-bold">Registreerija:</div>
                                    {details.registreerijaEesnimi}&nbsp;
                                    {details.registreerijaPerenimi}&nbsp;
                                    ({details.registreerijaEMeil})
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Kategooriad</th>
                        </tr>
                        </thead>
                        <tbody>
                        {category.blogs && category.blogs.map((item) => (
                            <tr>
                                <td>{item.parkimiskohaKategooria} ({item.parkimiskohaKategooriaTyyp})</td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Sule
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Kood</th>
                    <th>Seisund</th>
                    <th>Pinnakate</th>
                    <th>Parkla</th>
                    <th>Pikkus kraad</th>
                    <th>Laius kraad</th>
                    <th>Kommentaar</th>
                    <th>Tegevus</th>
                </tr>
                </thead>
                <tbody>
                {posts.blogs && posts.blogs.map((item) => (
                    <tr key={item.parkimiskohaKood}>
                        <td>{item.parkimiskohaKood}</td>
                        <td>{item.hetkeseisund}</td>
                        <td>{item.pinnakatte}</td>
                        <td>{item.parklaKood}</td>
                        <td>{item.koordinaadidPikkus}</td>
                        <td>{item.koordinaadidLaius}</td>
                        <td>{item.parkimiskohaKommentaar}</td>
                        <td width={"200px"}>
                            <div className='button-div'>
                                <Button onClickCapture={() => handleShow(item.parkimiskohaKood)}>
                                    VAATA
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
        </div>
    );
}