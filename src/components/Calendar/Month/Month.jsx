import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthThunk } from 'components/redux/month/operations';
import {
  selectorIsLoadingMonth,
  selectorWaterMonth,
} from 'components/redux/month/selectors';

import Icons from '../../../images/sprite.svg';
import DayComponent from './Day';

import {
  ArrowButton,
  CalendarContainer,
  DaysContainer,
  MonthNav,
  MonthControl,
  Month,
  MonthTitle,
} from './Month.styled';
import { ThreeDots } from 'react-loader-spinner';
import { baseTheme } from '../../../theme';

export const Calendar = dailyNormaState => {
  // аргумент "dailyNormaState" принимаем информацию о дневной норме потребления воды
  const [currentDate, setCurrentDate] = useState(new Date()); // текущая дата + функция состояния; currentDate = текущая дата
  const dispatch = useDispatch(); // хук - отправляем действие в стор
  const waterForMonth = useSelector(selectorWaterMonth); // извлекает значение waterForMonth
  const ref = useRef(null);
  const isLoading = useSelector(selectorIsLoadingMonth); // загружаются ли данные в текущий месяц.

  useEffect(() => {
    const month = `${
      currentDate.getMonth() + 1
    } - ${currentDate.getFullYear()}`; // выводим текущий месяц и год

    dispatch(fetchMonthThunk(month));
  }, [dispatch, currentDate, dailyNormaState]);

  const handleNextMonth = () => {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonthDate);
  };

  const handlePrevMonth = () => {
    const prevMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonthDate);
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getDaysInMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const waterPercentage = waterForMonth?.find(
        item => item.dayOfMonth && Number(item.dayOfMonth.split(',')[0]) === day
      );

      return (
        <DayComponent
          key={day}
          calendarRef={ref}
          day={day}
          waterPercentage={waterPercentage}
        />
      );
    });
  };

  return (
    <CalendarContainer className="calendar" ref={ref}>
      <MonthNav>
        <MonthTitle>Month</MonthTitle>
        {isLoading && (
          <ThreeDots
            height="60"
            width="60"
            radius="9"
            color={baseTheme.colors.blue}
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              height: '30px',
              width: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            wrapperClassName=""
            visible={true}
          />
        )}
        <MonthControl>
          <ArrowButton aria-label="Previous month" onClick={handlePrevMonth}>
            <svg>
              <use href={Icons + '#arrow-left'}></use>
            </svg>
          </ArrowButton>
          <Month>
            {`${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
              currentDate
            )}, ${currentDate.getFullYear()}`}
          </Month>
          <ArrowButton
            aria-label="Next month"
            onClick={handleNextMonth}
            disabled={isCurrentMonth()}
          >
            <svg>
              <use href={Icons + '#arrow-right'}></use>
            </svg>
          </ArrowButton>
        </MonthControl>
      </MonthNav>
      <DaysContainer>{renderDays()}</DaysContainer>
    </CalendarContainer>
  );
};
