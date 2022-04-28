import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const CompleteProject = ({ complete, id }) => {
  const [resultLink, setResultLink] = useState("");
  const isFormFilled = () => resultLink;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const triggerComplete = () => {
    complete(id, resultLink);
    handleClose();
  };
  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-dark"
        className="w-100 py-3 btn-warning"
      >
        Complete
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Complete Project</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Result Link"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setResultLink(e.target.value);
                }}
                placeholder="Enter a link to your results"
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              triggerComplete();
            }}
          >
            Complete Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CompleteProject.propTypes = {
  save: PropTypes.func.isRequired,
};

export default CompleteProject;