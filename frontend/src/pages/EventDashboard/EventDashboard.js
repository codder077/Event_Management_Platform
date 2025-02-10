import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard/EventCard";
import debounce from "lodash.debounce";
import { fetchEvents } from "../../utils/api";
import "./EventDashboard.css"; // Importing custom CSS for styles

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    type: "all",
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [filters]);

  const loadEvents = async () => {
    try {
      const response = await fetchEvents(filters);
      setLoading(false);
      setEvents(response.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleFilterChange = debounce((key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, 300);

  const filterEvents = () => {
    const currentDate = new Date();

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (filters.type === "upcoming" && eventDate < currentDate) return false;
      if (filters.type === "past" && eventDate > currentDate) return false;

      if (filters.title && event.name?.toLowerCase().includes(filters.title.toLowerCase()) === false) {
        return false;
      }

      if (filters.category && event.category !== filters.category) {
        return false;
      }

      if (startDate && eventDate < startDate) {
        return false;
      }

      if (endDate && eventDate > endDate) {
        return false;
      }

      return true;
    });
  };

  const filteredEvents = filterEvents();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Event Dashboard</h1>

      <div className="filters">
        <div className="search-bar-container">
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
            placeholder="Search events..."
            className="filter-input search-bar"
          />
          <button
            className="filter-icon-button"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          >
            <i className="fas fa-sliders-h"></i> {/* Font Awesome filter icon */}
          </button>
        </div>
      </div>

      {/* Side filter panel */}
      <div className={`filter-panel ${isFilterPanelOpen ? "open" : ""}`}>
        <button className="close-button" onClick={() => setIsFilterPanelOpen(false)}>
          &times;
        </button>

        <div className="filter-group">
          <label className="filter-label">Category:</label>
          <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)} className="filter-input">
            <option value="">All Categories</option>
            <option value="Tech Talks">Tech Talks</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinars">Webinars</option>
            <option value="Conference">Conference</option>
            <option value="Meetup">Meetup</option>
            <option value="Health Awareness">Health Awareness</option>
            <option value="Virtual Concerts">Virtual Concerts</option>
          </select>
        </div>

        <div className="divider"></div>

        <div className="filter-group">
          <label className="filter-label">Start Date:</label>
          <input type="date" value={filters.startDate} onChange={(e) => handleFilterChange("startDate", e.target.value)} className="filter-input" />
        </div>

        <div className="filter-group">
          <label className="filter-label">End Date:</label>
          <input type="date" value={filters.endDate} onChange={(e) => handleFilterChange("endDate", e.target.value)} className="filter-input" />
        </div>

        <div className="divider"></div>

        <div className="filter-group">
          <label className="filter-label">Event Type:</label>
          <select value={filters.type} onChange={(e) => handleFilterChange("type", e.target.value)} className="filter-input">
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        <button onClick={() => setFilters({ title: "", category: "", startDate: "", endDate: "", type: "all" })} className="reset-button">
          Reset Filters
        </button>
      </div>

      {loading ? (
        <div className="loading-box">Loading your events...</div>
      ) : (
        <div className="event-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p>No events found matching the criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
