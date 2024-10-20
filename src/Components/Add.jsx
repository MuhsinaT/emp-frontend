import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addemployeeApi } from '../Services/Allapi';


function Add() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State to capture user input
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    age: "",
    qualification: "",
    email: ""
  });




  const handleAddUpload = async () => {
    console.log(user);
    const { firstname, lastname, age, qualification, email } = user
    if (!firstname || !lastname || !age || !qualification || !email) {
      toast.warning("Enter Valid Inputes")
    }
    else {
      try {
        const response = await addemployeeApi(user);
        if (response.status === 200) {
          toast.success("User Added Successfully");
          handleClose()
          setUser({
            firstname: "",
            lastname: "",
            age: "",
            qualification: "",
            email: ""
          })
        }
      } catch (error) {
        toast.error("Error adding employee");
        console.error(error);
      }

    }
  };


  return (
    <>
<div className="d-flex justify-content-center mb-4 mt-3">
  <button className="btn btn-outline-info w-50 " onClick={handleShow}>Add Users</button>
</div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* First Name */}
          <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
          </FloatingLabel>

          {/* Last Name */}
          <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
          </FloatingLabel>

          {/* Age */}
          <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Age"
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />
          </FloatingLabel>

          {/* Qualification */}
          <FloatingLabel controlId="floatingQualification" label="Qualification" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Qualification"
              onChange={(e) => setUser({ ...user, qualification: e.target.value })}
            />
          </FloatingLabel>

          {/* Email */}
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
