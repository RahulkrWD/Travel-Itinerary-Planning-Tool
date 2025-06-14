import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  Container,
  Card,
  Form,
  Button,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { FaPlane, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/PlannerPage.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlannerPage = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateDates = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (trip.startDate && trip.startDate < today) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    if (trip.endDate && trip.startDate && trip.endDate < trip.startDate) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDuration = () => {
    if (!trip.startDate || !trip.endDate) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const createTrip = async (tripData) => {
    try {
      await axios.post(`${url}/trip/add-trip`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      navigate("/my-trips");
      setErrors({});
    } catch (error) {
      console.error(
        "Error creating trip:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!trip.title) {
      setErrors((prev) => ({ ...prev, title: "Trip title is required" }));
      return;
    }

    if (!trip.destination) {
      setErrors((prev) => ({
        ...prev,
        destination: "Destination is required",
      }));
      return;
    }

    if (!validateDates()) return;

    const duration = calculateDuration();
    if (duration < 1) {
      setErrors((prev) => ({
        ...prev,
        endDate: "Minimum trip duration is 1 day",
      }));
      return;
    }

    const tripData = {
      ...trip,
      duration,
      createdAt: new Date().toISOString(),
    };

    await createTrip(tripData);

    // Reset form
    setTrip({
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      notes: "",
    });
  };

  return (
    <Layout>
      <Container className="py-5 planner-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-center"
        >
          <Card
            className="shadow-sm"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <FaPlane className="me-2" />
                Plan a New Trip
              </Card.Title>

              {success && (
                <Alert variant="success" className="mb-4">
                  Trip planned successfully!
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="title"
                  label="Trip Title"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="title"
                    value={trip.title}
                    onChange={handleInputChange}
                    placeholder="Summer Vacation"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="destination"
                  label="Destination"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="destination"
                    value={trip.destination}
                    onChange={handleInputChange}
                    placeholder="Paris, France"
                    isInvalid={!!errors.destination}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.destination}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <FloatingLabel controlId="startDate" label="Start Date">
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={trip.startDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        isInvalid={!!errors.startDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </div>
                  <div className="col-md-6">
                    <FloatingLabel controlId="endDate" label="End Date">
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={trip.endDate}
                        onChange={handleInputChange}
                        min={
                          trip.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        isInvalid={!!errors.endDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </div>
                </div>

                {trip.startDate && trip.endDate && (
                  <div className="mb-3 text-muted">
                    Trip Duration: {calculateDuration()} day
                    {calculateDuration() !== 1 ? "s" : ""}
                  </div>
                )}

                <FloatingLabel controlId="notes" label="Notes (Optional)">
                  <Form.Control
                    as="textarea"
                    name="notes"
                    value={trip.notes}
                    onChange={handleInputChange}
                    placeholder="Any special plans or reminders"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="d-grid mt-4"
                >
                  <Button variant="primary" type="submit" size="lg">
                    <FaPlus className="me-2" />
                    Create Trip Plan
                  </Button>
                </motion.div>
              </Form>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default PlannerPage;
