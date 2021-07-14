import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { Modal, Button, Form } from "react-bootstrap";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface modalProps {
  handleClose: () => void;
}
const UserInfo = ({ handleClose }: modalProps) => {
  const { createNewUser, updateUserInfo } = useActions();
  const { userLoading, error, toggleModal, modalData } = useTypedSelector(
    (state) => state.usersList
  );

  const [id, setUserId] = useState(modalData?.id);
  const [name, setName] = useState(modalData?.name);
  const [email, setEmail] = useState(modalData?.email);
  const [role, setRole] = useState(modalData?.role);

  const handleSubmit = () => {
    if (!name) {
      alert("Please enter a name to proceed");
    } else if (!email) {
      alert("Please an email to proceed");
    } else if (!role || role === "Select a Role") {
      alert("Please select a role to proceed");
    } else {
      if (modalData?.action === "create") {
        const payload = {
          name: name,
          email: email,
          role: role,
        };
        createNewUser(payload);
      } else if (modalData?.action === "update") {
        const payload = {
          _id: id,
          name: name,
          email: email,
          role: role,
        };
        updateUserInfo(payload);
      }
    }
  };

  return (
    <Modal show={toggleModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalData?.action === "create" ? "Create" : "Update"} User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <span style={{ color: "#A00" }}>{error}</span>}
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label style={{ fontWeight: "bold" }}>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label style={{ fontWeight: "bold" }}>EMAIL</Form.Label>
            <Form.Control
              type="email"
              required={true}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label style={{ fontWeight: "bold" }}>ROLE</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setRole(e.target.value)}
              defaultValue={role}
            >
              <option>Select a Role</option>
              <option>User</option>
              <option>Admin</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {/* {closeModal && handleClose()} */}
        {userLoading && (
          <span
            className="text-center"
            style={{
              color: "#000000",
              width: "100%",
              display: "block",
            }}
          >
            Processing...
          </span>
        )}
        <Button
          variant="default"
          onClick={handleClose}
          style={{
            color: "#000000",
            width: "100%",
            fontWeight: "bold",
            display: "block",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#00b8c5",
            color: "#ffffff",
            width: "100%",
            display: "block",
          }}
        >
          {modalData?.action === "create" ? "Create" : "Update"} User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfo;
