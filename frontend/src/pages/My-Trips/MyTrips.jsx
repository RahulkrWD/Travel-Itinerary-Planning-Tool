import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaStickyNote,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "../../styles/MyTrips.css";
import { Link } from "react-router-dom";

const MyTrips = () => {
  const token = useSelector((state) => state.auth.token);
  const url = import.meta.env.VITE_API_URL;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch trips from backend
  const fetchTrips = async () => {
    try {
      const res = await axios.get(`${url}/trip/get-trip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrips(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axios.delete(`${url}/trip/delete-trip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { tripId: id },
      });

      fetchTrips();
    } catch (error) {
      setError("Failed to delete trips");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="trips-background">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-center trips-header">
              <FaPlaneDeparture className="me-2" />
              My Travel Adventures
              <FaPlaneArrival className="ms-2" />
            </h2>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center my-5"
              >
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading your trips...</p>
              </motion.div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              </motion.div>
            )}

            {!loading && trips.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center my-5"
              >
                <Alert variant="info">
                  <h5>No trips planned yet!</h5>
                  <p>Start your journey by planning your first adventure.</p>
                </Alert>
              </motion.div>
            )}

            <Row className="g-4">
              {trips.map((trip) => (
                <Col key={trip._id} md={6} lg={4}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="trip-card h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Card.Title className="trip-title">
                            {trip.title}
                            {trip.isDefault && (
                              <Badge bg="primary" className="ms-2">
                                Default
                              </Badge>
                            )}
                          </Card.Title>
                          <div>
                            <Button
                              onClick={() => deleteTrip(trip._id)}
                              variant="link"
                              className="p-0 text-danger"
                            >
                              <FaTrash size={20} />
                            </Button>
                          </div>
                        </div>

                        <div className="trip-detail">
                          <FaMapMarkedAlt className="trip-icon" />
                          <span className="trip-text">{trip.destination}</span>
                        </div>

                        <div className="trip-detail">
                          <FaCalendarAlt className="trip-icon" />
                          <span className="trip-text">
                            {formatDate(trip.startDate)} -{" "}
                            {formatDate(trip.endDate)}
                          </span>
                        </div>

                        <div className="trip-detail">
                          <FaClock className="trip-icon" />
                          <span className="trip-text">
                            <strong>
                              {trip.duration} day
                              {trip.duration !== 1 ? "s" : ""}
                            </strong>
                          </span>
                        </div>

                        {trip.notes && (
                          <div className="trip-detail mt-3">
                            <FaStickyNote className="trip-icon" />
                            <div className="trip-notes">
                              <em>{trip.notes}</em>
                            </div>
                          </div>
                        )}

                        <div className="trip-info mt-3">
                          <Link to={`/view-info/${trip._id}`}>
                            <Button>View Info</Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </div>
    </Layout>
  );
};

export default MyTrips;
