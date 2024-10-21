import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Add from '../Components/Add';
import { getemployeeApi, deleteEmployeeApi, UpdateEmployeeApi } from '../Services/Allapi';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function Home() {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [editEmp, setEditEmp] = useState({
    id: "", firstname: "", lastname: "", age: "", qualification: "", email: ""
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getemployeeApi();
      if (res.status === 200) {
        setEmployees(res.data);
        getData()
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteEmployeeApi(id);
      if (res.status === 200) {
        toast.success("Deletion successful!!");
        getData(); // Refresh employee list after deletion
      } else {
        toast.error("Deletion failed!!");
      }
    } catch (error) {
      toast.error("Error occurred during deletion.");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setEditEmp({
      id: data._id, firstname: data.firstname, lastname: data.lastname, age: data.age, qualification: data.qualification, email: data.email
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await UpdateEmployeeApi(editEmp, editEmp.id);
      if (res.status === 200) {
        toast.success("Update successful!!");
        handleClose(); 
        setEditEmp({
          id: "", firstname: "", lastname: "", age: "", qualification: "", email: ""
        });
        getData()
      } else {
        toast.error("Update failed!!");
      }
    } catch (error) {
      toast.error("Error occurred during update.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Employee List</h2>
      <Add /> 
      <div className="container-fluid p-5 row">
  {employees.length > 0 ? (
    employees.map((item, index) => (
      <Card style={{ width: '18rem' }} className="col-md-4 col-sm-6 me-4 mb-4 border shadow" key={index}>
        <Card.Body>
          <Card.Title>{item.firstname} {item.lastname}</Card.Title>
          <Card.Text>
            <strong>Age:</strong> {item.age} <br />
            <strong>Qualification:</strong> {item.qualification} <br />
            <strong>Email:</strong> {item.email}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-info" onClick={() => handleShow(item)} style={{ width: '45%' }}>
              <i className="fa-solid fa-pen-to-square" style={{color: "#5f8ddd"}} /> Edit
            </button>
            <button className="btn btn-outline-danger" onClick={() => handleDelete(item._id)} style={{ width: '45%' }}>
              <i className="fa-solid fa-trash" style={{color: "#c43612"}} /> Delete
            </button>
          </div>
        </Card.Body>
      </Card>
          ))
        ) : (
          <p className="text-center">No employees found.</p>
        )}
      </div>

      {/* Modal for editing employee */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={editEmp.firstname} onChange={(e) => setEditEmp({ ...editEmp, firstname: e.target.value })} className='form-control mb-3' />
          <input type="text" value={editEmp.lastname} onChange={(e) => setEditEmp({ ...editEmp, lastname: e.target.value })} className='form-control mb-3' />
          <input type="text" value={editEmp.age} onChange={(e) => setEditEmp({ ...editEmp, age: e.target.value })} className='form-control mb-3' />
          <input type="text" value={editEmp.qualification} onChange={(e) => setEditEmp({ ...editEmp, qualification: e.target.value })} className='form-control mb-3' />
          <input type="text" value={editEmp.email} onChange={(e) => setEditEmp({ ...editEmp, email: e.target.value })} className='form-control mb-3' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
