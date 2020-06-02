import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {

    constructor (props) {
        console.log("DishDetailComponent Component: constructor invoked");
        super(props);
        this.state= {
           selectedDish: this.props.dish
        };
    }

    componentDidMount() {
        console.log("DishDetailComponent Component: componentDidMount invoked");
    }

    componentDidUpdate() {
        console.log("DishDetailComponent Component: componentDidUpdate invoked");
    }
    
    renderComments() {
        return ( 
            this.props.dish.comments
        )
    }

    render() {
        console.log("DishDetailComponent Component: render() Invoked");
        const dishItem = this.props.dish;
        if (dishItem != null) {
            return (
                <div className="container">
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
                                            <li> { item.comment } </li>
                                            <li> -- { item.author }, 
                                                { Intl.DateTimeFormat('en-US', 
                                                {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))} </li>    
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