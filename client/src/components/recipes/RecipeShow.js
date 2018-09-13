import React from 'react';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'

const RecipeShow = (props) => (
  <React.Fragment>
    <ModalHeader >
      {props.title}
      <p className="font-italic h6">{props.category}</p>
      <br></br>
      <p className="h5">{props.ingrediants}</p>
    </ModalHeader>
      <ModalBody>
        {props.ingrediants}
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={props.onUpdateClick}>UPDATE</Button>
        <Button color="danger" onClick={props.onDeleteClick}>DELETE</Button>
    </ModalFooter>
  </React.Fragment>
)

export default RecipeShow;
