import { Calendar } from 'components/Calendar/Month/Month';
import { TodayWaterList } from 'components/TodayWaterList/TodayWaterList';
import {
  BubblesContainer,
  DailyNormaSection,
  PageContainer,
  TrackerContainer,
} from './HomePage.styled';
import DailyNorma from 'components/DailyNorma/DailyNorma';
import { Container } from 'components/Container';
import { WaterRatioPanel } from 'components/WaterRatioPanel/WaterRatioPanel';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'redux/water/selectors';

const HomePage = () => {
  const isLoading = useSelector(selectIsLoading);
  const initialState = {
    dailyNorma: 0,
  };
  const [dailyNormaState, setDailyNormaState] = useState(initialState);
  const { user } = useAuth();

  const dailyNormaCalc = (user.waterRate / 1000).toFixed(1);

  useEffect(() => {
    setDailyNormaState(prevState => ({
      ...prevState,
      dailyNorma: dailyNormaCalc,
    }));
  }, [dailyNormaCalc]);

  return (
    <BubblesContainer>
      <Container>
        <PageContainer>
          <DailyNormaSection>
            <DailyNorma />
            <WaterRatioPanel />
          </DailyNormaSection>
          <TrackerContainer>
            <TodayWaterList />
            <Calendar dailyNormaState={dailyNormaState} />
          </TrackerContainer>
        </PageContainer>
      </Container>
      {isLoading && <Loader />}
    </BubblesContainer>
  );
};

export default HomePage;
