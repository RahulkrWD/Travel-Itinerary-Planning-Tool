import React from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import {
  FlightTakeoff,
  Hotel,
  Restaurant,
  Hiking,
  DirectionsCar,
  BeachAccess,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/HomePage.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { token } = useSelector((state) => state.auth);
  const features = [
    {
      icon: <FlightTakeoff fontSize="large" />,
      title: "Flights",
      description: "Find the best deals on flights worldwide",
    },
    {
      icon: <Hotel fontSize="large" />,
      title: "Hotels",
      description: "Discover comfortable stays for every budget",
    },
    {
      icon: <Restaurant fontSize="large" />,
      title: "Dining",
      description: "Experience local cuisines and top restaurants",
    },
    {
      icon: <DirectionsCar fontSize="large" />,
      title: "Transport",
      description: "Easy transportation options in every city",
    },
  ];

  const popularDestinations = [
    {
      name: "Bali, Indonesia",
      image:
        "https://www.travellingking.com/wp-content/uploads/2017/11/tobias-winkelmann-367873.jpg",
      price: "$899",
    },
    {
      name: "Santorini, Greece",
      image:
        "https://a.cdn-hotels.com/gdcs/production18/d1838/041ae6b1-0a88-4c22-a648-53a22dd4a006.jpg",
      price: "$1299",
    },
    {
      name: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "$1499",
    },
    {
      name: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "$1099",
    },
  ];

  const travelTypes = [
    { icon: <BeachAccess />, label: "Beach" },
    { icon: <Hiking />, label: "Adventure" },
    { icon: <Hotel />, label: "Luxury" },
    { icon: <DirectionsCar />, label: "Road Trips" },
    { icon: <Restaurant />, label: "Food Tours" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box className="hero-section">
        <Typography variant="h2" component="h1" className="hero-title">
          Discover Your Next Adventure
        </Typography>
        <Typography variant="h5" className="hero-subtitle">
          Explore the world with our curated travel experiences
        </Typography>
        <Link
          className="text-decoration-none"
          to={token ? "/planner" : "Sign-In"}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="animated-button"
          >
            Start Exploring
          </Button>
        </Link>
      </Box>

      {/* Features Section */}
      <Box className="section bg-light">
        <Typography variant="h4" align="center" className="section-heading">
          Everything You Need For Your Trip
        </Typography>
        <div className="container">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <Card className="feature-card">
                  <CardContent className="text-center">
                    <Box className="icon-box">{feature.icon}</Box>
                    <Typography variant="h6">{feature.title}</Typography>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions className="justify-content-center">
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* Popular Destinations */}
      <Box className="section">
        <Typography variant="h4" align="center" className="section-heading">
          Popular Destinations
        </Typography>
        <div className="container">
          <div className="row g-4">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <Card className="destination-card">
                  <CardMedia
                    image={destination.image}
                    title={destination.name}
                    className="destination-image"
                  />
                  <Box className="destination-overlay">
                    <Typography variant="h6">{destination.name}</Typography>
                    <Typography variant="subtitle1">
                      From {destination.price}
                    </Typography>
                  </Box>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* Travel Types */}
      <Box className="section bg-light">
        <Typography variant="h4" align="center" className="section-heading">
          Find Your Travel Style
        </Typography>
        <div className="container">
          <div className="row g-3 justify-content-center">
            {travelTypes.map((type, index) => (
              <div key={index} className="col-auto">
                <Chip
                  icon={type.icon}
                  label={type.label}
                  className="travel-chip"
                  clickable
                />
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* Call to Action */}
      <Box className="section call-to-action">
        <div className="container text-center">
          <Typography variant="h4" className="section-heading text-white">
            Ready for Your Next Adventure?
          </Typography>
          <Typography variant="h6" className="text-white mb-4">
            {token
              ? "Get 10% off your First Booking"
              : "Sign up now and get 10% off your first booking"}
          </Typography>
          <Link
            className="text-decoration-none text-white"
            to={token ? "/planner" : "Sign-In"}
          >
            <Button variant="contained" color="secondary" size="large">
              {token ? "Planner" : "Sign In Today"}
            </Button>
          </Link>
        </div>
      </Box>
    </Layout>
  );
};

export default HomePage;
