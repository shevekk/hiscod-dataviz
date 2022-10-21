import styled from 'styled-components'
import React, { useState, useContext, useEffect } from "react";
import { Range, getTrackBackground } from 'react-range';
import { DataContext } from '../../providers/data'

function RangeCustom({changeDateValues, min, max, text, newValues}) {

  const [ values, setValues ] = useState(newValues);

  const [ changeTextDateEnable, setChangeTextDateEnable ] = useState(false);
  const [ valueMinInputValue, setValueMinInputValue ] = useState(values[0]);
  const [ valueMaxInputValue, setValueMaxInputValue ] = useState(values[1]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  // Change the dates from input
  const savTextDateChange = () => {
    let minValue = values[0];
    let maxValue = values[1];

    if(minValue < min) {
      minValue = min;
    }
    if(maxValue > max) {
      maxValue = max;
    }

    if(maxValue < minValue) {
      maxValue = minValue;
    }

    setValues([minValue, maxValue]);
    setChangeTextDateEnable(false);
    changeDateValues([minValue, maxValue]);
  }

  return (
    <div>
      {!changeTextDateEnable ? <p className="filter-date-text" onClick={() => setChangeTextDateEnable(true)}>{text} : {values[0]} - {values[1]}</p> : ""}
        {
          changeTextDateEnable ?
          <form className="filter-date-text">{text} :
          <input type='number' min={min} max={max} value={values[0]} onChange={e => setValues([parseInt(e.target.value), values[1]])} /> -
          <input type='number' min={min} max={max} value={values[1]} onChange={e => setValues([values[0], parseInt(e.target.value)])} />
          <button onClick={() => savTextDateChange()}>OK</button></form>
          : ""
        }

      <div className="filter-date-range">
        <Range
          step={1}
          min={min}
          max={max}
          values={values}
          allowOverlap={true}
          onChange={(newValues) => {
            //console.log(newValues);
            if(newValues[0] <= newValues[1]) {
              setValues(newValues);
              changeDateValues(newValues);
            }
          }}
          renderTrack={({ props, children }) => (
              <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "7px",
                width: "100%",
                borderRadius: "3px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: min,
                  max: max
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
          )}
          renderThumb={({ props, isDragged }) => (
              <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "3px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC"
              }}
            />
          </div>
          )}
        />
      </div>
    </div>
  )
}

export default RangeCustom
