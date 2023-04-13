import { useMemo } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import styled from '@emotion/styled';

highchartsAccessibility(Highcharts);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  > :first-of-type {
    margin-bottom: 16px;
  }
`;

export const Chart = ({ series }) => {
  const title = useMemo(() => series.map((item) => item.name).join(','), [series]);

  const options = useMemo(
    () => ({
      chart: {
        width: 800,
        height: 500
      },
      title: {
        text: title,
        align: 'left'
      },
      xAxis: {
        type: 'datetime'
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      credits: {
        enabled: false
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },

      series,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }
        ]
      }
    }),
    [title, series]
  );

  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  );
};
