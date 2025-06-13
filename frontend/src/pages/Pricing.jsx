import React from "react";
import Layout from "../components/Layout/Layout";
import {
  FaPlane,
  FaHotel,
  FaMapMarkedAlt,
  FaGlobeAmericas,
  FaConciergeBell,
  FaCheck,
  FaTimes,
  FaCrown,
} from "react-icons/fa";
import { GiPathDistance, GiSuitcase } from "react-icons/gi";
import { motion } from "framer-motion";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
} from "react-bootstrap";
import "../styles/Pricing.css";

const Pricing = () => {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      period: "forever",
      popular: false,
      features: [
        { text: "5 trip plans per month", included: true },
        { text: "Basic itinerary suggestions", included: true },
        { text: "Public trip sharing", included: true },
        { text: "Ad-supported experience", included: true },
        { text: "Premium destinations", included: false },
        { text: "Collaboration tools", included: false },
        { text: "Offline access", included: false },
      ],
      icon: <FaMapMarkedAlt size={32} />,
    },
    {
      name: "Traveler",
      price: "$9.99",
      period: "per month",
      popular: true,
      features: [
        { text: "Unlimited trip plans", included: true },
        { text: "Advanced itinerary builder", included: true },
        { text: "Private trip sharing", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Premium destinations", included: true },
        { text: "Basic collaboration tools", included: true },
        { text: "Offline access", included: false },
      ],
      icon: <FaPlane size={32} />,
    },
    {
      name: "Adventurer",
      price: "$19.99",
      period: "per month",
      popular: false,
      features: [
        { text: "Unlimited trip plans", included: true },
        { text: "AI-powered itinerary builder", included: true },
        { text: "Private trip sharing", included: true },
        { text: "Ad-free experience", included: true },
        { text: "All premium destinations", included: true },
        { text: "Advanced collaboration tools", included: true },
        { text: "Offline access", included: true },
      ],
      icon: <FaGlobeAmericas size={32} />,
    },
  ];

  const features = [
    {
      title: "Trip Planning",
      icon: <GiPathDistance size={24} />,
      items: [
        "Unlimited itineraries",
        "AI-powered suggestions",
        "Route optimization",
      ],
    },
    {
      title: "Accommodation",
      icon: <FaHotel size={24} />,
      items: ["Hotel recommendations", "Price comparisons", "Exclusive deals"],
    },
    {
      title: "Experiences",
      icon: <GiSuitcase size={24} />,
      items: [
        "Local activity suggestions",
        "Tour booking",
        "Custom experiences",
      ],
    },
    {
      title: "Support",
      icon: <FaConciergeBell size={24} />,
      items: [
        "24/7 travel assistance",
        "Dedicated concierge",
        "Emergency support",
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pricing-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content text-center"
          >
            <h1>Simple, Transparent Pricing</h1>
            <p className="lead">
              Choose the perfect plan for your travel needs
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="pricing-container py-5">
        {/* Pricing Plans */}
        <section className="pricing-plans mb-5">
          <h2 className="text-center mb-5">Choose Your Plan</h2>

          <Row className="g-4 justify-content-center">
            {plans.map((plan, index) => (
              <Col key={index} lg={4} md={6}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="plan-card-wrapper"
                >
                  <Card
                    className={`h-100 ${plan.popular ? "popular-plan" : ""}`}
                  >
                    {plan.popular && (
                      <div className="popular-badge">
                        <FaCrown className="me-2" />
                        Most Popular
                      </div>
                    )}
                    <Card.Body className="text-center">
                      <div className="plan-icon mb-3">{plan.icon}</div>
                      <h3>{plan.name}</h3>
                      <div className="price-display my-4">
                        <span className="price">{plan.price}</span>
                        <span className="period">/{plan.period}</span>
                      </div>

                      <ListGroup variant="flush" className="mb-4">
                        {plan.features.map((feature, i) => (
                          <ListGroup.Item key={i} className="feature-item">
                            {feature.included ? (
                              <FaCheck className="text-success me-2" />
                            ) : (
                              <FaTimes className="text-muted me-2" />
                            )}
                            <span
                              className={feature.included ? "" : "text-muted"}
                            >
                              {feature.text}
                            </span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>

                      <Button
                        variant={plan.popular ? "primary" : "outline-primary"}
                        size="lg"
                        className="w-100"
                      >
                        {plan.price === "Free" ? "Get Started" : "Choose Plan"}
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Feature Comparison */}
        <section className="feature-comparison mb-5">
          <h2 className="text-center mb-5">Plan Comparison</h2>

          <div className="comparison-table">
            <Card>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Feature</th>
                        {plans.map((plan, i) => (
                          <th key={i} className="text-center">
                            {plan.name}
                            {plan.popular && (
                              <Badge bg="primary" className="ms-2">
                                Popular
                              </Badge>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {plans[0].features.map((_, i) => (
                        <tr key={i}>
                          <td>{plans[0].features[i].text}</td>
                          {plans.map((plan, j) => (
                            <td key={j} className="text-center">
                              {plan.features[i].included ? (
                                <FaCheck className="text-success" />
                              ) : (
                                <FaTimes className="text-muted" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-grid mb-5">
          <h2 className="text-center mb-5">What You'll Get</h2>

          <Row className="g-4">
            {features.map((feature, i) => (
              <Col key={i} md={6} lg={3}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="feature-card"
                >
                  <Card className="h-100">
                    <Card.Body>
                      <div className="feature-icon mb-3">{feature.icon}</div>
                      <h4>{feature.title}</h4>
                      <ul className="feature-list">
                        {feature.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>

          <Row className="g-4">
            <Col md={6}>
              <Card className="faq-card">
                <Card.Body>
                  <h5>Can I change plans later?</h5>
                  <p>
                    Yes, you can upgrade or downgrade your plan at any time.
                    Changes will take effect at the start of your next billing
                    cycle.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="faq-card">
                <Card.Body>
                  <h5>Is there a free trial?</h5>
                  <p>
                    We offer a 14-day free trial for all paid plans. No credit
                    card required to start your trial.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="faq-card">
                <Card.Body>
                  <h5>What payment methods do you accept?</h5>
                  <p>
                    We accept all major credit cards, PayPal, and in some
                    regions, Apple Pay and Google Pay.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="faq-card">
                <Card.Body>
                  <h5>Can I cancel anytime?</h5>
                  <p>
                    Absolutely. You can cancel your subscription at any time,
                    and you'll continue to have access until the end of your
                    billing period.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section className="cta-section text-center py-5 mt-5">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <h2>Ready to Start Your Journey?</h2>
            <p className="lead mb-4">
              Join thousands of travelers who trust us to plan their perfect
              trips.
            </p>
            <Button variant="primary" size="lg" className="me-3">
              Start 14-Day Free Trial
            </Button>
            <Button variant="outline-primary" size="lg">
              Contact Sales
            </Button>
          </motion.div>
        </section>
      </Container>
    </Layout>
  );
};

export default Pricing;
