import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  FaUser,
  FaEdit,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Tab,
  Tabs,
} from "react-bootstrap";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  // User data state
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and adventure seeker. Love exploring new places and cultures.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
      country: "USA",
      isDefault: false,
    },
  ]);

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Form states
  const [profileForm, setProfileForm] = useState({ ...user });
  const [addressForm, setAddressForm] = useState({
    type: "home",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser(profileForm);
    setShowProfileModal(false);
  };

  // Handle address add/update
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (addressForm.id) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === addressForm.id ? addressForm : addr
        )
      );
    } else {
      // Add new address
      setAddresses([
        ...addresses,
        {
          ...addressForm,
          id: Date.now(),
        },
      ]);
    }
    setShowAddressModal(false);
    setAddressForm({
      type: "home",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    });
  };

  // Handle address delete
  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  // Handle set default address
  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setAddressForm(address);
    setShowAddressModal(true);
  };

  return (
    <Layout>
      <Container className="profile-container py-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4 profile-tabs"
          >
            <Tab eventKey="profile" title="Profile">
              <Row className="g-4">
                {/* Profile Section */}
                <Col lg={4}>
                  <Card className="profile-card h-100">
                    <Card.Body className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="avatar-container mb-3"
                      >
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="profile-avatar"
                        />
                        <div className="edit-overlay">
                          <FaEdit />
                        </div>
                      </motion.div>
                      <h3>{user.name}</h3>
                      <p className="text-muted">{user.bio}</p>

                      <div className="profile-info mt-4">
                        <p>
                          <FaEnvelope className="me-2" />
                          {user.email}
                        </p>
                        <p>
                          <FaPhone className="me-2" />
                          {user.phone}
                        </p>
                      </div>

                      <Button
                        variant="outline-primary"
                        className="mt-3"
                        onClick={() => {
                          setProfileForm({ ...user });
                          setShowProfileModal(true);
                        }}
                      >
                        <FaEdit className="me-2" />
                        Edit Profile
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Addresses Section */}
                <Col lg={8}>
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>My Addresses</h4>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setAddressForm({
                              type: "home",
                              street: "",
                              city: "",
                              state: "",
                              zip: "",
                              country: "",
                              isDefault: false,
                            });
                            setShowAddressModal(true);
                          }}
                        >
                          <FaPlus className="me-2" />
                          Add Address
                        </Button>
                      </div>

                      <Row className="g-4">
                        {addresses.map((address) => (
                          <Col md={6} key={address.id}>
                            <motion.div
                              whileHover={{ y: -5 }}
                              className="address-card"
                            >
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
                                        onClick={() =>
                                          handleEditAddress(address)
                                        }
                                      >
                                        <FaEdit />
                                      </Button>
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="text-danger"
                                        onClick={() =>
                                          handleDeleteAddress(address.id)
                                        }
                                      >
                                        <FaTrash />
                                      </Button>
                                    </div>
                                  </div>
                                  <p className="mb-1">{address.street}</p>
                                  <p className="mb-1">
                                    {address.city}, {address.state}{" "}
                                    {address.zip}
                                  </p>
                                  <p className="mb-3">{address.country}</p>
                                  {!address.isDefault && (
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={() =>
                                        handleSetDefault(address.id)
                                      }
                                    >
                                      Set as Default
                                    </Button>
                                  )}
                                </Card.Body>
                              </Card>
                            </motion.div>
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
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="settings" title="Settings">
              <Card>
                <Card.Body>
                  <h4>Account Settings</h4>
                  <p className="text-muted">Coming soon...</p>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </motion.div>
      </Container>

      {/* Profile Edit Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProfileUpdate}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phone: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={profileForm.bio}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowProfileModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Address Edit Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {addressForm.id ? "Edit Address" : "Add New Address"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddressSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Address Type</Form.Label>
              <Form.Select
                value={addressForm.type}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, type: e.target.value })
                }
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                value={addressForm.street}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, street: e.target.value })
                }
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, city: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State/Province</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressForm.state}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, state: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>ZIP/Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressForm.zip}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, zip: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressForm.country}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              type="checkbox"
              label="Set as default address"
              checked={addressForm.isDefault}
              onChange={(e) =>
                setAddressForm({ ...addressForm, isDefault: e.target.checked })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {addressForm.id ? "Update Address" : "Add Address"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProfilePage;
