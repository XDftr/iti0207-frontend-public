import {useRef, useState} from "react";
import API from "../services/api";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";


export default function Login() {
    if (window.sessionStorage.getItem("token") != null) {
        window.location.replace('/home')
    }
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");

    /*
     Handle post submit
     Field cannot be empty is checked automatically
     Request user data from backend
     */
    async function handleSubmit(e) {
        e.preventDefault()

        const body = {email:emailRef.current.value, password:passwordRef.current.value};
        await API.post('api/public/login', body)
            .then(r => {
                console.log(r)
                window.sessionStorage.setItem("email", r.data.email)
                window.sessionStorage.setItem("token", r.data.token)
                window.location.replace('/home')
            })
            .catch(() => {
            setError("Emeil või parool on vale!")
        })
    }

    return(

        <Container className="d-flex align-items-center justify-content-center"
                   style={{ minHeight: "100vh"}}>
            <Card className="w-100" style={{ maxWidth: "400px"}}>
                <Card.Body >
                    <h2 className={"text-center mb-4"}>Sisselogimine</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id = "username">
                            <Form.Label>Emeil</Form.Label>
                            <Form.Control type="text" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Parool</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <p/>
                        <Button
                            className="w-100"
                            type="submit">Logi sisse</Button>
                    </Form>
                </Card.Body>
            </Card>


        </Container>

    )
}
