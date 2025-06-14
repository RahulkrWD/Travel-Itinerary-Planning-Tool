import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Spinner,
  Badge,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaPlane,
  FaUsers,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlus,
  FaPaperPlane,
  FaTimes,
  FaCheck,
  FaClock,
  FaUtensils,
  FaHotel,
  FaShoppingBag,
  FaBus,
  FaEllipsisH,
  FaArrowLeft,
} from "react-icons/fa";
import "../../styles/ViewInfo.css";

function ViewInfo() {
  const { tripId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // State management
  const [trip, setTrip] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState({
    trip: true,
    collaborators: true,
    expenses: true,
  });
  const [error, setError] = useState({
    trip: null,
    collaborators: null,
    expenses: null,
  });

  // Modal states
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [collabEmail, setCollabEmail] = useState("");
  const [collabSubmitting, setCollabSubmitting] = useState(false);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "Food",
    paidBy: "",
  });
  const [expenseSubmitting, setExpenseSubmitting] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get icon for expense category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaUtensils className="me-2" />;
      case "Travel":
        return <FaBus className="me-2" />;
      case "Accommodation":
        return <FaHotel className="me-2" />;
      case "Shopping":
        return <FaShoppingBag className="me-2" />;
      default:
        return <FaEllipsisH className="me-2" />;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Fetch trip details
  const fetchTripDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, trip: true }));
      setError((prev) => ({ ...prev, trip: null }));

      const res = await axios.get(`${url}/trip/get-trip/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrip(res.data.data);
    } catch (error) {
      console.error("Failed to load trip", error);
      setError((prev) => ({ ...prev, trip: "Failed to load trip details" }));
    } finally {
      setLoading((prev) => ({ ...prev, trip: false }));
    }
  };

  // Fetch collaborators
  const fetchCollaborators = async () => {
    try {
      setLoading((prev) => ({ ...prev, collaborators: true }));
      setError((prev) => ({ ...prev, collaborators: null }));

      const res = await axios.get(`${url}/trip/collaboration/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollaborators(res.data.data);
    } catch (err) {
      console.error(err);
      setError((prev) => ({
        ...prev,
        collaborators: "Failed to load collaborators",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, collaborators: false }));
    }
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      setLoading((prev) => ({ ...prev, expenses: true }));
      setError((prev) => ({ ...prev, expenses: null }));

      const res = await axios.get(`${url}/trip/get-expense/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data.data);
    } catch (err) {
      console.error(err);
      setError((prev) => ({ ...prev, expenses: "Failed to load expenses" }));
    } finally {
      setLoading((prev) => ({ ...prev, expenses: false }));
    }
  };

  // Invite collaborator
  const handleInvite = async () => {
    if (!collabEmail) return;

    try {
      setCollabSubmitting(true);
      await axios.post(
        `${url}/trip/invite`,
        { tripId, email: collabEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowCollabModal(false);
      setCollabEmail("");
      fetchCollaborators();
    } catch (error) {
      console.error("Invite failed", error);
      alert(error.response?.data?.message || "Failed to send invitation");
    } finally {
      setCollabSubmitting(false);
    }
  };

  // Add expense
  const handleAddExpense = async () => {
    if (!expense.title || !expense.amount) return;

    try {
      setExpenseSubmitting(true);
      await axios.post(
        `${url}/trip/add-expense`,
        { tripId, ...expense },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowExpenseModal(false);
      setExpense({ title: "", amount: "", category: "Food", paidBy: "" });
      fetchExpenses();
      fetchTripDetails();
    } catch (error) {
      console.error("Add expense failed", error);
      alert(error.response?.data?.message || "Failed to add expense");
    } finally {
      setExpenseSubmitting(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchTripDetails();
    fetchCollaborators();
    fetchExpenses();
  }, [tripId]);

  return (
    <Layout>
      <Container className="py-4">
        <Button
          className="mb-5"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </Button>
        {/* Trip Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h2 className="d-flex align-items-center">
            <FaPlane className="me-3 text-primary" />
            Trip Details
          </h2>
        </motion.div>

        {/* Trip Info Card */}
        {loading.trip ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading trip details...</p>
          </div>
        ) : error.trip ? (
          <Alert variant="danger">{error.trip}</Alert>
        ) : (
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="mb-4 shadow-sm trip-info-card">
              <Card.Body>
                <Card.Title className="trip-title">{trip.title}</Card.Title>

                <div className="trip-details-grid">
                  <div className="trip-detail">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span className="detail-label">Destination:</span>
                    <span className="detail-value">
                      {trip.destination || "N/A"}
                    </span>
                  </div>

                  <div className="trip-detail">
                    <FaCalendarAlt className="detail-icon" />
                    <span className="detail-label">Dates:</span>
                    <span className="detail-value">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </span>
                  </div>

                  <div className="trip-detail">
                    <FaMoneyBillWave className="detail-icon" />
                    <span className="detail-label">Total Cost:</span>
                    <span className="detail-value">
                      ₹{trip.totalCost?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>

                {trip.notes && (
                  <div className="trip-notes mt-3">
                    <p className="mb-1">
                      <strong>Notes:</strong>
                    </p>
                    <p>{trip.notes}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {/* Collaborators Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <Row className="align-items-center mb-3">
            <Col>
              <h4 className="d-flex align-items-center">
                <FaUsers className="me-2 text-primary" />
                Collaborators
              </h4>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                style={{ float: "right" }}
                onClick={() => setShowCollabModal(true)}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                Invite
              </Button>
            </Col>
          </Row>

          {loading.collaborators ? (
            <div className="text-center py-2">
              <Spinner animation="border" size="sm" />
            </div>
          ) : error.collaborators ? (
            <Alert variant="danger">{error.collaborators}</Alert>
          ) : collaborators.length === 0 ? (
            <Alert variant="info">
              No collaborators yet. Invite someone to join your trip!
            </Alert>
          ) : (
            <div className="collaborators-grid">
              {collaborators.map((col) => (
                <motion.div
                  key={col._id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="collaborator-card mb-2">
                    <Card.Body className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{col.email}</strong>
                          <div className="text-muted small">
                            {col.status === "pending" ? (
                              <span className="text-warning">
                                <FaClock className="me-1" /> Pending
                              </span>
                            ) : col.status === "accepted" ? (
                              <span className="text-success">
                                <FaCheck className="me-1" /> Joined
                              </span>
                            ) : (
                              <span className="text-danger">
                                <FaTimes className="me-1" /> Rejected
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge
                          bg={col.role === "admin" ? "primary" : "secondary"}
                        >
                          {col.role}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Expenses Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Row className="align-items-center mb-3">
            <Col>
              <h4 className="d-flex align-items-center">
                <FaMoneyBillWave className="me-2 text-primary" />
                Expenses
              </h4>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                style={{ float: "right" }}
                onClick={() => setShowExpenseModal(true)}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                Add Expense
              </Button>
            </Col>
          </Row>

          {loading.expenses ? (
            <div className="text-center py-2">
              <Spinner animation="border" size="sm" />
            </div>
          ) : error.expenses ? (
            <Alert variant="danger">{error.expenses}</Alert>
          ) : expenses.length === 0 ? (
            <Alert variant="info">
              No expenses recorded yet. Add your first expense!
            </Alert>
          ) : (
            <div className="expenses-grid">
              {expenses.map((exp) => (
                <motion.div
                  key={exp._id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="expense-card mb-2">
                    <Card.Body className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="d-flex align-items-center">
                            {getCategoryIcon(exp.category)}
                            <strong>{exp.title}</strong>
                          </div>
                          <div className="text-muted small">
                            Paid by: {exp.paidBy}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="expense-amount">
                            ₹{exp.amount?.toLocaleString()}
                          </div>
                          <Badge
                            bg="light"
                            text="dark"
                            className="category-badge"
                          >
                            {exp.category}
                          </Badge>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Invite Collaborator Modal */}
        <Modal
          show={showCollabModal}
          onHide={() => setShowCollabModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="d-flex align-items-center">
              <FaPaperPlane className="me-2 text-primary" />
              Invite Collaborator
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter collaborator's email"
                value={collabEmail}
                onChange={(e) => setCollabEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCollabModal(false)}
              disabled={collabSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleInvite}
              disabled={!collabEmail || collabSubmitting}
            >
              {collabSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-1" />
                  Send Invite
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Expense Modal */}
        <Modal
          show={showExpenseModal}
          onHide={() => setShowExpenseModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="d-flex align-items-center">
              <FaMoneyBillWave className="me-2 text-primary" />
              Add New Expense
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Expense Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="e.g., Hotel Booking"
                  value={expense.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="e.g., 1500"
                  value={expense.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={expense.category}
                  onChange={handleChange}
                >
                  <option value="Food">Food & Dining</option>
                  <option value="Travel">Transportation</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Paid By</Form.Label>
                <Form.Control
                  type="text"
                  name="paidBy"
                  placeholder="Who paid for this?"
                  value={expense.paidBy}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowExpenseModal(false)}
              disabled={expenseSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddExpense}
              disabled={!expense.title || !expense.amount || expenseSubmitting}
            >
              {expenseSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Adding...
                </>
              ) : (
                "Add Expense"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}

export default ViewInfo;
