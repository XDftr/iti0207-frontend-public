import React, {useEffect, useState} from "react";

import "bootstrap/dist/css/bootstrap.css";
import {Button, Table} from "react-bootstrap";
import '../assets/styles/KoikParkimiskohad.css';
import API from '../services/api';
import {getToken} from "../services/api";
import Navbar from "../components/layout/navigation/Navbar";

export default function KoikParkimiskohad() {
    const [posts, setPosts] = useState({ blogs: []});
    const config = {
        headers: { Authorization: `Bearer ${getToken()}` }
    };
    async function handleEnd(a) {
        const response = await API.put('api/private/parkimiskoht/lopeta/' + a, null, config)
        console.log(response)

        const response2 = await API.get('api/private/parkimiskoht/leia_aktiivsed_mitteaktiivsed', config)
        console.log(response2)
        setPosts({blogs: response2.data})
    }

    useEffect(() => {
        async function getIsik() {
            const response = await API.get('api/private/parkimiskoht/leia_aktiivsed_mitteaktiivsed', config)
            setPosts({blogs: response.data})
            console.log(response)
        }
        getIsik()

    }, [])

    return (
        <div className="Isik">
            <Navbar />
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
                                <Button variant="danger" onClickCapture={() => handleEnd(item.parkimiskohaKood)}>
                                    LÕPETA
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