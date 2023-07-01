import React, {useState, useEffect} from 'react';

export default function Header() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [localDate, setLocalDate] = useState(new Date());

  const [calendar, setCalendar] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    currentDate,
    lastDateOfMonth: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(),
    firstDayOfMonth: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay(),
    lastDayOfMonth: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDay(),
    lastDateOfLastMonth: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate(),
  });

  const {
    year,
    month,
    date,
    lastDateOfMonth,
    firstDayOfMonth,
    lastDayOfMonth,
    lastDateOfLastMonth,
  } = calendar;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = [
    {title: 'Sunday', shortTitle: 'Sun'},
    {title: 'Monday', shortTitle: 'Mon'},
    {title: 'Tuesday', shortTitle: 'Tue'},
    {title: 'Wednesday', shortTitle: 'Wed'},
    {title: 'Thursday', shortTitle: 'Thur'},
    {title: 'Friday', shortTitle: 'Fri'},
    {title: 'Saturday', shortTitle: 'Sat'},
  ];

  useEffect(() => {
    setCalendar({
      year: localDate.getFullYear(),
      month: localDate.getMonth(),
      localDate,
      lastDateOfMonth: new Date(
        localDate.getFullYear(),
        localDate.getMonth() + 1,
        0
      ).getDate(),
      firstDayOfMonth: new Date(
        localDate.getFullYear(),
        localDate.getMonth(),
        1
      ).getDay(),
      lastDayOfMonth: new Date(
        localDate.getFullYear(),
        localDate.getMonth() + 1,
        0
      ).getDay(),
      lastDateOfLastMonth: new Date(
        localDate.getFullYear(),
        localDate.getMonth(),
        0
      ).getDate(),
    });
  }, [localDate]);

  useEffect(() => {
    window.calendar = calendar;
    console.log({...calendar});
  }, [calendar]);

  const handleOnClickNext = () => {
    setLocalDate(new Date(year, month + 1, 1));
  };

  const handleOnClickPrev = () => {
    setLocalDate(new Date(year, month - 1, 1));
  };

  const renderPrevDates = () => {
    const dates = [];
    for (let index = 1; index <= firstDayOfMonth; index++) {
      dates.push(
        <li className="prev-date">
          {lastDateOfLastMonth - firstDayOfMonth + index}
        </li>
      );
    }
    return dates;
  };

  const renderDates = () => {
    const dates = [];
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const localMonth = localDate.getMonth();
    for (let index = 1; index <= lastDateOfMonth; index++) {
      if (localMonth === month && date === index)
        dates.push(<li className="todaysDate">{index}</li>);
      else dates.push(<li className="">{index}</li>);
    }
    return dates;
  };

  const renderNextDates = () => {
    const dates = [];
    for (let index = 1; index <= 7 - lastDayOfMonth - 1; index++) {
      dates.push(<li className="next-date">{index}</li>);
    }
    return dates;
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col prev-next">
                <button
                  className="prev"
                  onClick={handleOnClickPrev}
                  type="button"></button>
                <h1>{`${monthNames[month]}, ${year}`}</h1>
                <button
                  className="next"
                  onClick={handleOnClickNext}
                  type="button"></button>
              </div>
            </div>
            <div className="row">
              {days.map((day) => (
                <div className="col p-0">
                  <h5 className="text-center day">{day.shortTitle}</h5>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col date">
                <ul className="">
                  {renderPrevDates()}
                  {renderDates()}
                  {renderNextDates()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
