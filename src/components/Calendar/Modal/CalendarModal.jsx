import { CalendarModalStyles } from './CalendarModal.styled';

const CalendarModal = ({ calendarRef, refData, waterData = {} }) => {
  const { dayOfMonth, waterRate, percent, numberRecords } = waterData;

  //  Здесь получаем значение "left" для текущего элемента и контейнера с помощью метода "getBoundingClientRect()".
  // Вычисляем "delta", которая определяет положение модального окна относительно контейнера.

  const currentRef = refData?.current.getBoundingClientRect().left;
  const containerRef = calendarRef?.current.getBoundingClientRect().left;

  let position = true;

  // Вычисляем разницу между позицией текущего элемента и контейнера.
  // Если разница "delta" между текущим элементом и контейнером меньше 250 пикселей, переменная position устанавливается в "false".

  const delta = currentRef - containerRef;
  if (delta < 250) {
    position = false;
  }

  // Проверяем наличие данных в "waterData". Если есть данные, отображается информация о потреблении воды за день,
  // в противном случае отображается сообщение о том, что записей за этот день нет.
  return (
    <CalendarModalStyles $delta={position} $deltaNum={delta}>
      {Object.values(waterData).length ? (
        <>
          <h3>{dayOfMonth}</h3>
          <p>
            Daily norma: <span>{waterRate / 1000} L</span>
          </p>
          <p>
            Fulfillment of the daily norm:{' '}
            <span>{percent > 100 ? 100 : percent}%</span>
          </p>
          <p>
            How many servings of water: <span>{numberRecords}</span>
          </p>
        </>
      ) : (
        <h3>You don't have records of this day.</h3>
      )}
    </CalendarModalStyles>
  );
};

export default CalendarModal;
