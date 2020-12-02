import React, {Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Label, Col, Row } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props, context) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            show: false
        }
    }

    handleSubmit(values) {
        alert("Thank you for your comment!" + JSON.stringify(values));
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
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".comment"
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
                        <Col md={6}>
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        );
    }
}

export default CommentForm;