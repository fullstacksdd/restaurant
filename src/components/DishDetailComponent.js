import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, /* Modal,  Button */ } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';

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
        comments.map((item, index) => {
            return (
                <ul className="list-unstyled" key={index}>
                    <li> { item.comment } </li>
                    <li> -- { item.author }, 
                        { Intl.DateTimeFormat('en-US', 
                        {year: 'numeric', month: 'short', 
                        day: '2-digit'}).format(new Date(Date.parse(item.date)))} </li>    
                </ul>
            )
        })   
    );
}

const DishDetail = (props) => {
    const [showModal, setShowModal] = useState(true)
    const toggleModal = () => {
      setShowModal(!showModal)
    }
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div> 
                <div className="row">
                    <div key={props.dish.id} className="col-12 col-md-5 col-xs-12 col-sm-12 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 col-xs-12 col-sm-12">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}/> 
                        {showModal && <CommentModal onClose={toggleModal} />}
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