import React from 'react';

import "../sources/timeline.css"

const Timeline = () => {
  const timelineData = [
    { time: '08:42', description: 'Outlines of the recent activities that happened last weekend', icon: '🔵' },
    { time: '3 hr', description: 'AEOL meeting with', icon: '🔴', images: ['👨‍💼', '👩‍💼'] },
    { time: '14:37', description: 'Submit initial budget - USD 700.', icon: '🔵' },
    { time: '16:50', description: 'Stakeholder meeting scheduling.', icon: '🔴' },
    { time: '17:30', description: 'Project scoping & estimations with stakeholders.', icon: '🟢' },
    { time: '21:03', description: 'New order placed #XF-2356.', icon: '🟠' },
    { time: '21:07', description: 'Company BBQ to celebrate the last quarter achievements and goals.', icon: '🟠' },
    { time: '20:30', description: 'Marketing campaign planning with customer.', icon: '🟣' },
  ];

  return (
    <div className="timeline">
      <div className="header">
        <h2>Actividad</h2>
        <p>890,344 Ventas</p>
      </div>
      <div className="timeline-items">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-content">
              <div className="time">{item.time}</div>
              <div className="description">
                {item.description}
                {item.images && (
                  <div className="images">
                    {item.images.map((image, imgIndex) => (
                      <span key={imgIndex} className="image">{image}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
