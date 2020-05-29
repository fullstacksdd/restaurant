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
            this.state.selectedDish.comments
        )
    }

    formatDate(itemDate) {
        var today = new Date(itemDate);
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[mm] + ' ' + dd + ', ' + yyyy;
    }

    render() {
        const dishItem = this.props.dish;
        if (dishItem != null) {
            return (
                <div>
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
                                            <br />
                                            <li> -- { item.author }, { this.formatDate(item.date) } </li>    
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