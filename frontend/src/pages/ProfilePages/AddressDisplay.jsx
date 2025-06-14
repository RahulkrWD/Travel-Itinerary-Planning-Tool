import React from "react";
import { FaPlus, FaMapMarkerAlt, FaEdit, FaTrash, FaHome, FaBriefcase } from "react-icons/fa";
import { Button, Card, Row, Col, Badge} from "react-bootstrap";
import { motion } from "framer-motion";

const AddressDisplay = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
}) => {
  return (
    <div className="col-lg-8">
      <Card className="h-100">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>My Addresses</h4>
            <Button
              variant="primary"
              size="sm"
              onClick={onAddAddress}
            >
              <FaPlus className="me-2" />
              Add Address
            </Button>
          </div>

          <Row className="g-4">
            {addresses.map((address) => (
              <Col md={6} key={address.id}>
                <AddressCard
                  address={address}
                  onEdit={onEditAddress}
                  onDelete={onDeleteAddress}
                  onSetDefault={onSetDefault}
                />
              </Col>
            ))}

            {addresses.length === 0 && (
              <Col className="text-center py-5">
                <FaMapMarkerAlt
                  size={48}
                  className="text-muted mb-3"
                />
                <h5>No addresses saved</h5>
                <p className="text-muted">
                  Add your first address to get started
                </p>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddressDisplay;

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
    return (
      <motion.div whileHover={{ y: -5 }} className="address-card">
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <h5>
                  {address.type === "home" ? (
                    <FaHome className="me-2" />
                  ) : (
                    <FaBriefcase className="me-2" />
                  )}
                  {address.type.charAt(0).toUpperCase() +
                    address.type.slice(1)}
                </h5>
                {address.isDefault && (
                  <Badge bg="success" className="mb-2">
                    Default
                  </Badge>
                )}
              </div>
              <div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onEdit(address)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  onClick={() => onDelete(address.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
            <p className="mb-1">{address.street}</p>
            <p className="mb-1">
              {address.city}, {address.state} {address.zip}
            </p>
            <p className="mb-3">{address.country}</p>
            {!address.isDefault && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => onSetDefault(address.id)}
              >
                Set as Default
              </Button>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    );
  };