import React from 'react';
import { Card, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../assets/css/components.css';

export const cardInfo = [];


const FundraiserCard = () => {
    // const cardInfo = [
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" },
    //     { title: "Hello World", text: "Some quick example text to build on the card title and make up the bulk of the card's content" }
    // ];

    const renderCard = (card, index) => {
        return (
            <Card style={{ width: '18rem', margin: '1%' }} key={index} className="card-render">
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>
                        {card.text}
                    </Card.Text>
                    <Button variant="primary">Donate</Button>
                </Card.Body>
            </Card>
        )

    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                {cardInfo.map(renderCard)}
            </Row>
        </Container>
    )
};

export default FundraiserCard