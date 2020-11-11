import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, /* Modal,  Button */ } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Label, Col, Row, Modal, ModalBody /* , ModalHeader */ } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderDish({dish}) {
    return(
        <Card>
            <CardImg src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
                <CardText>{dish.description}</CardText> 
            </CardBody>
        </Card>
    );
}

function RenderComments({comments, postComment, dishId}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    if (comments != null)
        return(
            <div className="col-12 col-md-10 m-1">
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p> -- { comment.author },  
                                        { Intl.DateTimeFormat('en-US',   
                                        {year: 'numeric', month: 'short',  
                                        day: '2-digit'}).format(new Date(Date.parse(comment.date)))} 
                                </p> 
                            </li>
                        );
                    })}
                </ul>
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
                        <ModalBody>
                        <CommentForm dishId={dishId} postComment={postComment} />
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    else
        return(
            <div>;</div>
        );
    }

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        if(this.props.isLoading) { 
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div> 
                    <div className="row">
                        <div key={this.props.dish.id} className="col-12 col-md-5 col-xs-12 col-sm-12 m-1">
                            <RenderDish dish={this.props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 col-xs-12 col-sm-12">
                            <h4>Comments</h4>                            
                            <RenderComments comments={this.props.comments} 
                                postComment={this.props.postComment} 
                                dishId={this.props.dish.id} /> 
                        </div>
                    </div>
                </div>
            )
        } 
    } 
}
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            toggleModal: false,
            showModal: true,
            setShowModal: true
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render () {
        return(              
            <div>
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
                            <Label htmlFor="author" md={4}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
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
        </div>
     );
    }
}

export default DishDetail;