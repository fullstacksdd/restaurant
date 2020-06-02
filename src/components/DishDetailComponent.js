import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {

    constructor (props) {
        super(props);
        this.state= {
           selectedDish: this.props.dish
        };
    }
    
    renderComments() {
        return ( 
            this.props.dish.comments
        )
    }

    render() {
        const dishItem = this.props.dish;
        console.log("dishItem= ", dishItem);
        if (dishItem != null) {
            return (
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 col-xs-12 col-sm-12 m-1">
                            <Card>
                                <CardImg src={dishItem.image} alt={dishItem.name} />
                                <CardBody>
                                    <CardImgOverlay>
                                        <CardTitle>{dishItem.name}</CardTitle>
                                    </CardImgOverlay>
                                    <CardText>{dishItem.description}</CardText> 
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 col-xs-12 col-sm-12 ">
                            <h4>Comments</h4>
                            <div>
                                {this.renderComments().map(item => {
                                    return (
                                        <ul className="list-unstyled">
                                            <p> { item.comment } </p>
                                            <p> -- { item.author }, 
                                                { Intl.DateTimeFormat('en-US', 
                                                {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))} </p>    
                                        </ul>
                                    )
                                })}           
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
            <div></div>);
        }
    }
}

export default DishDetail;