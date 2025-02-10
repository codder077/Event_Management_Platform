import React from "react";
import { deleteEvent, joiningEvent } from "../../utils/api";  
import { Link, useNavigate } from "react-router-dom";  
import { getUserIdFromToken } from '../../utils/tokenHelper';  
import './EventCard.css';  

const EventCard = ({ event, showManagementOptions, onEventUpdated }) => {
  const navigate = useNavigate();  

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {  
      try {
        await deleteEvent(event._id);  
        if (onEventUpdated) {
          onEventUpdated(event._id);  
        }
      } catch (err) {
        console.error("Failed to delete event:", err);  
      }
    }
  };

  const joinEvent = async (eventId) => {
    const userId = getUserIdFromToken();  
    if (!userId) {
      alert('Please log in to join events.');  
      return;
    }

    try {
      await joiningEvent(eventId, userId);  
      navigate(`/event/${event._id}/join`);  
    } catch (error) {
      console.error('Error joining event:', error);  
      alert(error.response?.data?.message || 'Failed to join event.');  
    }
  };

  return (
    <div 
      className="event-card"
      style={{ 
        backgroundImage: `url(${event.image})`,  // Set background image from event data
// Ensure text is readable over the image
      }}
    >
      <div className="overlay">  {/* Optional overlay for better readability */}
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleString()}</p>
        <p>Category: {event.category}</p>

        {showManagementOptions && <Link to={`/event/edit/${event._id}`}>Edit Event</Link>}  
        {showManagementOptions && <button type="button" onClick={handleDelete}>Delete</button>}
        
        <Link to={`/event/${event._id}`}>Event Details</Link>  
        <button onClick={() => joinEvent(event._id)}>Join Event</button>  
      </div>
    </div>
  );
};

export default EventCard;
