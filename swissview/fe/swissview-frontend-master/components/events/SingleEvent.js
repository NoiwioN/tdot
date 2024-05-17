import React from 'react';

export default function SingleEvent({event}) {
    let startTime = new Date(event.startTime);
    let endTime = new Date(event.endTime);
    let options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };

    let formattedStartTime = startTime.toLocaleString('de-CH', options);
    let formattedEndTime = endTime.toLocaleString('de-CH', options);

    return (
        <li key={event.id}>
            <h2><a href={`${event.url}`} target="_blank">{event.title}</a></h2>
            <img src={`/coatOfArms/${event.canton.id.toLowerCase()}.png`} alt="Wappen" width="50"
                 height="50"></img>
            <p >{event.description}</p>
            <p>{formattedStartTime} Uhr bis {formattedEndTime} Uhr - {event.location}</p>
        </li>
    )
}
