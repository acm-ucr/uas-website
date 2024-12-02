// Calendar.jsx
"use client";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import CustomToolbar from "./CustomToolbar.jsx";
import CustomEvent from "./CustomEvents.jsx";
import CustomHeader from "./CustomHeader.jsx";
import Modal from "./Modal.jsx";
import { motion } from "framer-motion";
import Events from "../events/Events.jsx";
// import UpcomingEvent from "../events/UpcomingEvent";

const localizer = momentLocalizer(moment);

const CalendarEvent = () => {
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  const animation = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${
            process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMAIL
          }/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
          &singleEvents=true&orderBy=startTime&timeMin=${new Date(
            new Date().getTime() - 60 * 60 * 24 * 7 * 10 * 1000,
          ).toISOString()}&timeMax=${new Date(
            new Date().getTime() + 60 * 60 * 24 * 7 * 10 * 1000,
          ).toISOString()}`,
        );

        const offset = new Date().getTimezoneOffset() * 60000;
        const data = await response.json();
        console.log(data);
        const items = data.items.map((item) => {
          item.allDay = !item.start.dateTime;
          (item.start = item.start.dateTime
            ? new Date(item.start.dateTime)
            : new Date(new Date(item.start.date).getTime() + offset)),
            (item.end = new Date(
              item.end.dateTime || new Date(item.end.date).getTime() + offset,
            )),
            (item.hidden = false);

          return item;
        });
        setEvents(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative mx-auto w-3/4 flex-col items-center justify-center font-jost">
      <motion.div
        className="flex w-10/12 items-center justify-center"
        variants={animation}
        transition={{ delay: 0.3 }}
        initial="hidden"
        whileInView="show"
      >
        <div
          style={{ width: "70vw", height: "90vh" }}
          className="relative z-0 font-jost"
        >
          {/* <div className="absolute right-[20%] w-full h-full bg-black border-4 border-white rounded-lg"/> */}
          <Calendar
            date={date}
            className="m-0 w-full rounded-xl p-0 text-sm md:text-2xl"
            allDayAccessor="allDay"
            showAllEvents={true}
            events={events}
            localizer={localizer}
            defaultView="month"
            views={["month"]}
            components={{
              event: CustomEvent,
              toolbar: CustomToolbar,
              header: CustomHeader,
            }}
            onNavigate={(newDate) => {
              return setDate(newDate);
            }}
            eventPropGetter={() => {
              return {
                className: `p-0 active:ring-0 focus:outline-0`,
              };
            }}
            onSelectEvent={(event) => setEvent(event)}
            dayPropGetter={(date) => {
              const TodaysDate =
                new Date(date).toLocaleDateString() ===
                new Date().toLocaleDateString();

              return {
                className: "",
                style: {
                  margin: 0,
                  padding: 0,
                  backgroundColor: TodaysDate ? "#93c5fd" : "#ffffff",
                },
              };
            }}
          />
        </div>
        {event && <Modal event={event} setEvent={setEvent} />}
      </motion.div>
      <Events events={events} />
    </section>
  );
};

export default CalendarEvent;
