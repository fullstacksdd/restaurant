import React from "react";
import { Button, Modal, ModalBody /* , ModalFooter */ } from "reactstrap";
import CommentForm from './CommentForm';

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

export default CommentModal;