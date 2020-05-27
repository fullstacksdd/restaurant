import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardDeck  } from 'reactstrap';

class DishDetail extends Component {

    constructor (props) {
        super(props);
        console.log('props= ', props);
        this.state= {
           selectedDish: this.props.dish
        };
    }
    
    render() {
        const comments = this.props.dish.comments.map((comment, index) => {
            return (
                <li key={index} >
                    {comment.rating}
                    {comment.author}
                    {comment.comment}
                    {comment.date}
                </li>
            );
        });
        const dishItem = this.props.dish;
        if (dishItem != null) {
            return (
                <CardDeck >
                    <Card>
                        <CardImg width="100%" src={dishItem.image} alt={dishItem.name} />
                        <CardBody>
                            <CardTitle>{dishItem.name}</CardTitle>
                            <CardText>{dishItem.description}</CardText>
                        </CardBody>
                    </Card>
                    <Card >
                        <CardImg width="100%" />
                        <CardBody>
                            <CardTitle>Comments</CardTitle>
                            <CardText>{ comments[dishItem.id] }</CardText>
                        </CardBody> 
                    </Card>
                </CardDeck>               
            )
        }
        else {
            return (
            <div></div>);
        }
    }
}

export default DishDetail;