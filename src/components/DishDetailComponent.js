import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle  } from 'reactstrap';

class DishDetail extends Component {

    constructor (props) {
        super(props);
        console.log('props= ', props);
        this.state= {
           selectedDish: this.props.dish
        };
    }

    componentDidMount() {

    }
    
    render() {
        const dishItem = this.props.dish;
        if (dishItem != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dishItem.image} alt={dishItem.name} />
                    <CardBody>
                        <CardTitle>{dishItem.name}</CardTitle>
                        <CardText>{dishItem.description}</CardText>
                </CardBody>
                </Card>
            )
        }
        else {
            return (
            <div></div>);
        }
    }
}

export default DishDetail;