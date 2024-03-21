import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import PropTypes from "prop-types";

const Forecast = ({ data }) => {
    console.log(data.list);
  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => {
          return (<AccordionItem key={idx}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className="daily-item">
                        <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className="icon-small" />
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>

            </AccordionItemPanel>
          </AccordionItem> )
        })}
      </Accordion>
    </>
  );
};

export default Forecast;

Forecast.propTypes ={
    data : PropTypes.object.isRequired,
}
