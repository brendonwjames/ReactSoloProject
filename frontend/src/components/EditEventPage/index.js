import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import { editEvent } from '../../store/events';


const EditEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { eventId } = useParams();

    eventId = parseInt(eventId);
    // console.log(eventId, '22')

    const eventsObj = useSelector(state => Object.values(state.events))
    // console.log(eventsObj, '*****', eventId)
    const event = eventsObj.find(event => event.id === eventId);
    // console.log(event)

    const hostId = useSelector(state => state.session.user.id);
    // console.log(hostId, "boooooobooooo")

    const [eventName, setEventName] = useState(event?.eventName);
    const [date, setDate] = useState(event?.date);
    const [capacity, setCapacity] = useState(event?.capacity);
    const [categoryId, setCategoryId] = useState(event?.categoryId)

    useEffect(()=> {
        setEventName(event?.eventName);
        setDate(event?.date);
        setCapacity(event?.capacity);
        setCategoryId(event?.categoryId);
    }, [event, dispatch])

    const reset = () => {
        setEventName("");
        setDate(new Date());
        setCapacity(0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { id: event.id, hostId, categoryId, eventName, date, capacity };
        let updateEvent = dispatch(editEvent(payload));

        if (updateEvent) {
            history.push('/events');
            reset();
        }
    }

    return (
        <div className='event-form-container'>
            <form
                className='event-form'
                onSubmit={handleSubmit}
            >
                <div>Edit</div>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </label>
                <label>
                    Date
                    <input
                        type='date'
                        name='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label>
                    Capacity
                    <input
                        type="number"
                        name="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </label>
                <div className='event-form-buttons'>
                    <button
                        type="submit"
                    >
                        Confirm
                    </button>
                    <Link to='/events/' className='cancel-event-button'>Cancel</Link>
                </div>
            </form>
        </div>
    )
}


export default EditEventPage