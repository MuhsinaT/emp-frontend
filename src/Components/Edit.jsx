import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { UpdateEmployeeApi } from '../Services/Allapi';
import { toast } from 'react-toastify'; // Assuming you're using toast for notifications

function Edit({ employeeData, getData }) {
  const [editEmp, setEditEmp] = useState({
    id: '', firstname: '', lastname: '', age: '', qualification: '', email: ''
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // This sets the form with current employee data
  const handleShow = (data) => {
    setShow(true);
    setEditEmp({
      id: data._id,
      firstname: data.firstname,
      lastname: data.lastname,
      age: data.age,
      qualification: data.qualification,
      email: data.email,
    });
  };

  // Handle update request
  const handleUpdate = async () => {
    const res = await UpdateEmployeeApi(editEmp,editEmp.id);
    console.log(res);

    if (res.status === 200) {
      toast.success("Updation successful!!");
      handleClose();
      setEditEmp({
        id: '', firstname: '', lastname: '', age: '', qualification: '', email: ''
      });
      getData();
    } else {
      toast.error("Updation failed!!");
    }
  };

  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* First Name */}
          <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
            <Form.Control
              type="text"
              value={editEmp.firstname}
              placeholder="First Name"
              onChange={(e) => setEditEmp({ ...editEmp, firstname: e.target.value })}
            />
          </FloatingLabel>

          {/* Last Name */}
          <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
            <Form.Control
              type="text"
              value={editEmp.lastname}
              placeholder="Last Name"
              onChange={(e) => setEditEmp({ ...editEmp, lastname: e.target.value })}
            />
          </FloatingLabel>

          {/* Age */}
          <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
            <Form.Control
              type="number"
              value={editEmp.age}
              placeholder="Age"
              onChange={(e) => setEditEmp({ ...editEmp, age: e.target.value })}
            />
          </FloatingLabel>

          {/* Qualification */}
          <FloatingLabel controlId="floatingQualification" label="Qualification" className="mb-3">
            <Form.Control
              type="text"
              value={editEmp.qualification}
              placeholder="Qualification"
              onChange={(e) => setEditEmp({ ...editEmp, qualification: e.target.value })}
            />
          </FloatingLabel>

          {/* Email */}
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              value={editEmp.email}
              placeholder="Email"
              onChange={(e) => setEditEmp({ ...editEmp, email: e.target.value })}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
