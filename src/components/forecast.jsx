import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const week_days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

import PropTypes from "prop-types";

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();

  const forecastDays = week_days
    .slice(dayInAWeek, week_days.length)
    .concat(week_days.slice(0, dayInAWeek));

  console.log(data.list);
  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="weather"
                      className="icon-small"
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_min)}°C /
                      {Math.round(item.main.temp_max)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                        <label className="">Pressure:</label>
                        <label >{item.main.pressure} hPa</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label className="">Humidity:</label>
                        <label >{item.main.humidity}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label className="">Clouds:</label>
                        <label >{item.clouds.all}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label className="">Wind Speed:</label>
                        <label >{item.wind.speed} m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label className="">Sea Level:</label>
                        <label >{item.main.sea_level} m</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label className="">Feels like:</label>
                        <label >{Math.round(item.main.feels_like)}°C</label>
                    </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
