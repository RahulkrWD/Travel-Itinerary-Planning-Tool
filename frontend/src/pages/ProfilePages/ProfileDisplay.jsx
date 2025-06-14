import React from "react";
import { FaEdit, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button, Card } from "react-bootstrap";

const ProfileDisplay = ({ user, onEditClick }) => {
  return (
    <div className="col-lg-4">
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
            onClick={onEditClick}
          >
            <FaEdit className="me-2" />
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileDisplay;