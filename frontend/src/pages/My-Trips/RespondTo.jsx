import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaCheck,
  FaTimes,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../../styles/RespondTo.css";

const RespondTo = () => {
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();

  const handleResponse = async () => {
    if (hasResponded) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/trip/respond/${id}`,
        { action: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(
        `You have ${
          status === "accepted" ? "accepted" : "rejected"
        } the invitation.`
      );
      setHasResponded(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to respond. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "accepted":
        return <FaCheckCircle className="status-icon accepted" />;
      case "rejected":
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  return (
    <motion.div
      className="respond-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="respond-card">
        <motion.div
          className="respond-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaPaperPlane className="header-icon" />
          <h2>Trip Invitation</h2>
        </motion.div>

        {!hasResponded ? (
          <motion.div
            className="respond-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="invitation-text">
              You've been invited to join this trip. How would you like to
              respond?
            </p>

            <div className="form-group">
              <label htmlFor="status">Your Response:</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="response-select"
                disabled={isSubmitting}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accept Invitation</option>
                <option value="rejected">Decline Invitation</option>
              </select>
            </div>

            <motion.button
              onClick={handleResponse}
              className={`submit-btn ${status}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting || status === "pending"}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                <>
                  {status === "accepted" ? (
                    <FaCheck className="btn-icon" />
                  ) : (
                    <FaTimes className="btn-icon" />
                  )}
                  {status === "accepted" ? "Accept" : "Decline"} Invitation
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="response-message"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <div className="status-display">
              {getStatusIcon()}
              <h3 className={`status-text ${status}`}>
                {status === "accepted"
                  ? "Invitation Accepted!"
                  : "Invitation Declined"}
              </h3>
            </div>
            <p className="message-text">{message}</p>
          </motion.div>
        )}

        {message && !hasResponded && (
          <motion.p
            className={`feedback-message ${
              message.includes("Failed") ? "error" : "success"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default RespondTo;
