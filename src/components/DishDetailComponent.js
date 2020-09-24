import React, { Component, useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, /* Modal,  Button */ } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Label, Col, Row, Modal, ModalBody } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

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

function CommentModal() {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
      <div>
        <Button type="button" onClick={() => setModalOpen(!modalOpen)}>
          <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
          Submit Comment
        </Button>
        <p></p>
        <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
          <div className=" modal-header">
            <h5 className=" modal-title" id="exampleModalLabel">
              Submit Comment
            </h5>
            <button aria-label="Close" className=" close" type="button"
              onClick={() => setModalOpen(!modalOpen)}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody><CommentForm /></ModalBody>
        </Modal>
      </div>
    );
  }
class CommentForm extends Component {

    constructor(props, context) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            show: false
        }
    }

    handleSubmit(values) {
        console.log("Current state is " + JSON.stringify(values));
        alert("Current state is " + JSON.stringify(values));
    }

    render () {
        return(              
            <div className="col-12 col-md-9">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={2}>Rating </Label>
                        <Col md={12}>
                            <Control.select model=".rating" id="rating" name="rating" 
                                className="form-control">
                                    <option>Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="yourname" md={4}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control" 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages={{
                                    required: "Required ",
                                    minLength: "Must be greater than 2 characters ",
                                    maxLength: "Must be 15 characters or less"
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={2}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                placeholder="Comment"  
                                className="form-control" 
                                rows="6"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={6}>
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        );
    }
}

export default DishDetail;