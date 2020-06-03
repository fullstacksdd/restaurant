import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';

    function RenderDish({dish}) {
        return(
                <Card>
                    <CardImg src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                        <CardText>{dish.description}</CardText> 
                    </CardBody>
                </Card>
        );
    }

    
    function RenderComments({comments}) {
        return(
            comments.map((item => {
                return (
                    <ul className="list-unstyled">
                        <li> { item.comment } </li>
                        <li> -- { item.author }, 
                            { Intl.DateTimeFormat('en-US', 
                            {year: 'numeric', month: 'short', 
                            day: '2-digit'}).format(new Date(Date.parse(item.date)))} </li>    
                    </ul>
                )
            })   
        ));
    }

    const DishDetail = (props) => {
        if (props.dish != null) {
            return (
                <div class="container">
                    <div className="row">
                        <div key={props.dish.id} className="col-12 col-md-5 col-xs-12 col-sm-12 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 col-xs-12 col-sm-12 ">
                            <h4>Comments</h4>
                            <RenderComments comments={props.dish.comments}/> 
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


export default DishDetail;