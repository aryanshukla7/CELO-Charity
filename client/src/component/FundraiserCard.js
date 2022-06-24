import React from 'react';
import { Card} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../assets/css/components.css';

export const cardInfo = [];


const FundraiserCard = () => {
    const renderCard = (card, index) => {
        return (
            <Card style={{ margin: '1%' }} key={index} className="card-render">
                <Card.Header>To Donate Visit the Donate Section</Card.Header>
                <Card.Body>
                    <Card.Title>Proposal ID: {card.title}</Card.Title>
                    <Card.Text>
                        {card.text}
                    </Card.Text>
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