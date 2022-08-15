import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

export default function Reserve({ setOpen, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log(allDates);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unvailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    console.log(isFound);
    return !isFound;
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate('/')
    } catch (error) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          className="rClose"
          icon={faCircleXmark}
          onClick={() => setOpen(false)}
        />
        <div className="titleName">
          <span>Select your rooms</span>
        </div>
        {data.map((item, idx) => {
          return (
            <div key={idx} className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max People : <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">$ {item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber, idx) => {
                  return (
                    <div key={idx} className="room">
                      <label>{roomNumber.number}</label>
                      
                        {isAvailable(roomNumber) ? (
                            <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled
                            />
                        ): (
                            <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            />
                        ) }
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
}
