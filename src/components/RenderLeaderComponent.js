import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
    
function RenderLeader({leaders}) {
    return(
        leaders.map((item, index) => {
            return (
                <ul className="list-unstyled" key={index}>
                    <Card>
                        <div style={{display: 'flex', flex: '1 1 auto'}}>
                            <CardImg style={{height: '100px',width: '25%'}}  src={item.image} />
                            <CardBody className="bg-faded">
                                <CardTitle>{item.name}</CardTitle>
                                <CardText>{item.designation}</CardText>
                                <CardText>{item.description}</CardText>
                            </CardBody>
                        </div>
                    </Card>
                </ul>
            );
        })   
    );
}

const LeaderDetail = (props) => {
    if (props.leaders != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <RenderLeader leaders={props.leaders}/>      
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
        <div></div>);
    }
}

export default LeaderDetail;