import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import CompleteProject from "./CompleteProject";

const Project = ({ project, apply, complete, pay }) => {
  const {
    id,
    price,
    name,
    description,
    owner,
    assignee,
    completed,
    result,
    paid,
  } = project;
  const account = window.walletConnection.account();
  const triggerApply = () => {
    apply(id);
  };

  const triggerApprove = () => {
    pay(id, price);
  };

  let button;
  if (assignee) {
    if (assignee === account.accountId) {
      button = <CompleteProject complete={complete} id={id} />;
    }
  } else {
    button = (
      <Button
        variant="outline-dark"
        onClick={triggerApply}
        className="w-100 py-3 btn-success"
      >
        Apply
      </Button>
    );
  }
  if (completed && !paid) {
    if (owner === account.accountId) {
      button = (
        <Button
          variant="outline-dark"
          onClick={triggerApprove}
          className="w-100 py-3 btn-primary"
        >
          Approve and Pay
        </Button>
      );
    } else {
      button = <>COMPLETED. PENDING APPROVAL</>;
    }
  } else if (completed && paid) {
    button = <>COMPLETED. PAID</>;
  }

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={4}>
            <Card.Title>{name}</Card.Title>
            <div className="vr ms-auto" />
            <Card.Subtitle>
              {utils.format.formatNearAmount(price)} NEAR
            </Card.Subtitle>
          </Stack>
          <span className="font-monospace text-secondary">
            <small>
              <i>{owner}</i>
            </small>
          </span>
        </Card.Header>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Text className="flex-grow-1">{description}</Card.Text>
          {completed && result
            ? <Card.Text className="flex-grow-1"><strong>Result: </strong><a href={result} class="link-info">{result}</a></Card.Text>
            : <></>
          }
          <Card.Text className="text-secondary">
            <Badge bg="secondary" className="ms-auto">
              Assignee: {assignee || "none"}
            </Badge>
          </Card.Text>
        </Card.Body>
        <Card.Footer>{button}</Card.Footer>
      </Card>
    </Col>
  );
};

Project.propTypes = {
  project: PropTypes.instanceOf(Object).isRequired,
};

export default Project;
