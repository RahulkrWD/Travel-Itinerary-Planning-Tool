import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBriefcase,
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
  Alert,
  Spinner,
} from "react-bootstrap";
import "../../styles/ProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  userProfile,
  getAddress,
  updateProfile,
  deleteAddress,
  addAddress,
  updateAddress,
} from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const token = useSelector((state) => state.auth.token);
  const { profile, addresses, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  });

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [addressForm, setAddressForm] = useState({
    type: "Home",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  // Load data on component mount
  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
      dispatch(getAddress(token));
    }
  }, [dispatch, token]);

  // Update form when profile data loads
  useEffect(() => {
    if (profile?.data) {
      setProfileForm({
        name: profile.data.name || "",
        email: profile.data.email || "",
        phone: profile.data.phone || "",
        bio: profile.data.bio || "",
      });
    }
  }, [profile]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateProfile({ token, userData: profileForm })
      );
      if (result.payload?.success) {
        setSuccessMessage("Profile updated successfully!");
        setShowProfileModal(false);
        dispatch(userProfile(token)); // Refresh profile data
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  // Handle address add/update
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (addressForm._id) {
        // Update existing address
        result = await dispatch(
          updateAddress({
            token,
            addressId: addressForm._id,
            address: addressForm,
          })
        );
      } else {
        // Add new address
        result = await dispatch(addAddress({ token, address: addressForm }));
      }

      if (result.payload?.success) {
        setSuccessMessage(
          addressForm._id
            ? "Address updated successfully!"
            : "Address added successfully!"
        );
        setShowAddressModal(false);
        resetAddressForm();
        dispatch(getAddress(token)); // Refresh addresses
      }
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  // Handle address delete
  const handleDeleteAddress = async (id) => {
    try {
      const result = await dispatch(deleteAddress({ token, addressId: id }));
      if (result.payload?.success) {
        setSuccessMessage("Address deleted successfully!");
        dispatch(getAddress(token)); // Refresh addresses
      }
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setAddressForm({
      _id: address._id,
      type: address.type,
      address: address.address,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      country: address.country,
    });
    setShowAddressModal(true);
  };

  // Reset address form
  const resetAddressForm = () => {
    setAddressForm({
      type: "Home",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    });
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) {
    return (
      <Layout>
        <Container className="profile-container py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="profile-container py-5">
          <Alert variant="danger">{error}</Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="profile-container py-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage("")}
              dismissible
            >
              {successMessage}
            </Alert>
          )}

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
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          alt="Profile"
                          className="profile-avatar"
                        />
                        <div className="edit-overlay">
                          <FaEdit />
                        </div>
                      </motion.div>
                      <h3>{profile?.data?.name}</h3>
                      {profile?.data?.bio && (
                        <p className="text-muted">{profile.data.bio}</p>
                      )}

                      <div className="profile-info mt-4">
                        <p>
                          <FaEnvelope className="me-2" />
                          {profile?.data?.email}
                        </p>
                        {profile?.data?.phone && (
                          <p>
                            <FaPhone className="me-2" />
                            {profile.data.phone}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="outline-primary"
                        className="mt-3"
                        onClick={() => setShowProfileModal(true)}
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
                            resetAddressForm();
                            setShowAddressModal(true);
                          }}
                        >
                          <FaPlus className="me-2" />
                          Add Address
                        </Button>
                      </div>

                      <Row className="g-4">
                        {addresses?.data?.length > 0 ? (
                          addresses.data.map((address) => (
                            <Col md={6} key={address._id}>
                              <motion.div
                                whileHover={{ y: -5 }}
                                className="address-card"
                              >
                                <Card>
                                  <Card.Body>
                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <h5>
                                          {address.type === "Home" ? (
                                            <FaHome className="me-2" />
                                          ) : address.type === "Work" ? (
                                            <FaBriefcase className="me-2" />
                                          ) : (
                                            <FaMapMarkerAlt className="me-2" />
                                          )}
                                          {address.type}
                                        </h5>
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
                                            handleDeleteAddress(address._id)
                                          }
                                        >
                                          <FaTrash />
                                        </Button>
                                      </div>
                                    </div>
                                    <p className="mb-1">{address.address}</p>
                                    <p className="mb-1">
                                      {address.city}, {address.state}{" "}
                                      {address.pinCode}
                                    </p>
                                    <p className="mb-3">{address.country}</p>
                                  </Card.Body>
                                </Card>
                              </motion.div>
                            </Col>
                          ))
                        ) : (
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
                readOnly
                disabled
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
            {addressForm._id ? "Edit Address" : "Add New Address"}
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
                required
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                value={addressForm.address}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, address: e.target.value })
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
                    type="number"
                    value={addressForm.pinCode}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        pinCode: e.target.value,
                      })
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {addressForm._id ? "Update Address" : "Add Address"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProfilePage;
