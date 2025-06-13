import React from "react";
import Layout from "../components/Layout/Layout";
import {
  FaSearchLocation,
  FaRoute,
  FaCalendarAlt,
  FaHotel,
  FaPlane,
  FaArrowRight,
} from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineDirections } from "react-icons/md";
import { motion } from "framer-motion";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tab,
  Tabs,
  Accordion,
} from "react-bootstrap";
import "../styles/HowItWorks.css";

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="how-it-works-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>How TripIt Works</h1>
            <p className="lead">
              Plan your perfect trip in just a few simple steps
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="how-it-works-container py-5">
        {/* Steps Section */}
        <section className="steps-section mb-5">
          <h2 className="text-center mb-5">
            Simple Steps to Your Perfect Trip
          </h2>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <motion.div whileHover={{ scale: 1.05 }} className="step-card">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="step-icon">
                      <FaSearchLocation size={48} />
                      <div className="step-number">1</div>
                    </div>
                    <h3>Choose Destination</h3>
                    <p>
                      Search and select your dream destination from our
                      extensive database of locations worldwide.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div whileHover={{ scale: 1.05 }} className="step-card">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="step-icon">
                      <FaCalendarAlt size={48} />
                      <div className="step-number">2</div>
                    </div>
                    <h3>Set Dates</h3>
                    <p>
                      Pick your travel dates and duration. We'll optimize your
                      itinerary based on your schedule.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div whileHover={{ scale: 1.05 }} className="step-card">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="step-icon">
                      <FaRoute size={48} />
                      <div className="step-number">3</div>
                    </div>
                    <h3>Customize Itinerary</h3>
                    <p>
                      Personalize your trip with activities, restaurants, and
                      attractions that match your interests.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div whileHover={{ scale: 1.05 }} className="step-card">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="step-icon">
                      <FaPlane size={48} />
                      <div className="step-number">4</div>
                    </div>
                    <h3>Book & Travel</h3>
                    <p>
                      Book your flights, hotels, and activities all in one
                      place. Then enjoy your perfect trip!
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Map Section */}
        <section className="map-section mb-5">
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2>Visualize Your Journey</h2>
                <p className="lead">
                  Our interactive map helps you see your entire trip at a glance
                  and optimize your route.
                </p>
                <ul className="map-features-list">
                  <li>
                    <GiPathDistance className="me-2" />
                    Distance calculations between locations
                  </li>
                  <li>
                    <MdOutlineDirections className="me-2" />
                    Optimized route planning
                  </li>
                  <li>
                    <FaHotel className="me-2" />
                    Nearby hotel and restaurant suggestions
                  </li>
                </ul>
                <Button variant="primary" className="mt-3">
                  Try It Now <FaArrowRight className="ms-2" />
                </Button>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="map-container"
              >
                <div
                  style={{
                    height: "400px",
                    width: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <section className="map-section p-5 bg-light text-center">
                    <div className="map-container shadow-lg">
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.126416630789!2d-122.40137968468137!3d37.79084117975673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c96a7f1f%3A0x3444a4bca7a74ae7!2sSalesforce%20Tower!5e0!3m2!1sen!2sin!4v1614254977592!5m2!1sen!2sin"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </section>
                </div>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Features Section */}
        <section className="features-section mb-5">
          <h2 className="text-center mb-5">Why Choose TripIt?</h2>

          <Tabs defaultActiveKey="planning" className="mb-4">
            <Tab eventKey="planning" title="Planning">
              <Row className="g-4 mt-3">
                <Col md={6}>
                  <Card className="feature-card">
                    <Card.Body>
                      <div className="feature-icon">
                        <FaRoute size={32} />
                      </div>
                      <h3>Smart Itinerary Builder</h3>
                      <p>
                        Our AI-powered system creates optimized daily schedules
                        based on your preferences, travel pace, and location
                        proximity.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="feature-card">
                    <Card.Body>
                      <div className="feature-icon">
                        <FaCalendarAlt size={32} />
                      </div>
                      <h3>Flexible Date Planning</h3>
                      <p>
                        Not sure when to go? Get recommendations for the best
                        times to visit based on weather, crowds, and pricing.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="booking" title="Booking">
              <Row className="g-4 mt-3">
                <Col md={6}>
                  <Card className="feature-card">
                    <Card.Body>
                      <div className="feature-icon">
                        <FaHotel size={32} />
                      </div>
                      <h3>Integrated Booking</h3>
                      <p>
                        Book flights, hotels, tours, and restaurants all in one
                        place with our trusted partners for the best prices.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="feature-card">
                    <Card.Body>
                      <div className="feature-icon">
                        <FaPlane size={32} />
                      </div>
                      <h3>Real-time Availability</h3>
                      <p>
                        See up-to-date availability and pricing for all your
                        trip components before you book.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0" className="mb-3">
              <Accordion.Header>
                How do I create my first itinerary?
              </Accordion.Header>
              <Accordion.Body>
                Simply sign up for an account, click "Create New Trip," and
                follow the step-by-step process to select your destination,
                dates, and interests. Our system will generate a personalized
                itinerary that you can further customize.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="mb-3">
              <Accordion.Header>
                Can I share my trip with friends?
              </Accordion.Header>
              <Accordion.Body>
                Yes! TripIt makes it easy to collaborate. You can invite friends
                to view and edit your itinerary, vote on activities, and split
                costs for booked items.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Is there a mobile app available?
              </Accordion.Header>
              <Accordion.Body>
                Absolutely. TripIt is available on both iOS and Android, so you
                can access and modify your itinerary on the go. All changes sync
                automatically across devices.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="cta-section text-center py-5 mt-5">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <h2>Ready to Plan Your Adventure?</h2>
            <p className="lead mb-4">
              Join thousands of travelers who are already planning their perfect
              trips with TripIt.
            </p>
            <Button variant="primary" size="lg" className="me-3">
              Get Started - It's Free
            </Button>
            <Button variant="outline-primary" size="lg">
              Take a Tour
            </Button>
          </motion.div>
        </section>
      </Container>
    </Layout>
  );
};

export default HowItWorks;
