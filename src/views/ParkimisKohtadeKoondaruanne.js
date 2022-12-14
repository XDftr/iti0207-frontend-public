import React, {useEffect, useState} from "react";

import '../assets/styles/ParkimisKohtadeKoondaruanne.css';
import API, {getToken} from '../services/api';
import {Table} from "react-bootstrap";
import Navbar from "../components/layout/navigation/Navbar";

export default function ParkimisKohtadeKoondaruanne() {
    const [posts, setPosts] = useState({blogs: []});
    const config = {
        headers: { Authorization: `Bearer ${getToken()}` }
    };

    useEffect(() => {
        async function getIsik() {
            const response = await API.get('api/private/parkimiskoht/leia_koondaruanne', config)
            setPosts({blogs: response.data})
            console.log(response)
        }

        getIsik()

    }, [])

    return (
        <div className="Isik">
            <Navbar />
            <Table className={"TabelKoond"} striped bordered hover>
                <thead>
                <tr>
                    <th>Parkimiskoha seisundi liik kood</th>
                    <th>Seisundi nimetus</th>
                    <th>Arv</th>

                </tr>
                </thead>
                <tbody>
                {posts.blogs && posts.blogs.map((item) => (
                    <tr key={item.parkimiskohaSeisundiLiikKood}>
                        <td className={"FirstTable"}>{item.parkimiskohaSeisundiLiikKood}</td>
                        <td className={"SecondTable"}>{item.seisundiNimetus}</td>
                        <td className={"ThirdTable"}>{item.arv}</td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
        </div>
    );
}