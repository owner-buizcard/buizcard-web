import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { formatDate, formatDateMin } from '../../utils/utils';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

const LineChart = ({data, date})=>{

    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
  
    const [options, setOptions] = useState(areaChartOptions);


  useEffect(() => {
    setOptions((prevState) => ({
        ...prevState,
        colors: [theme.palette.primary.main, theme.palette.primary[700]],
        xaxis: {
            categories:
            date.length>0 
              ? date.map((d)=>formatDateMin(d))
              : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
            style: {
                colors: [
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary
              ]
            }
            },
            axisBorder: {
            show: true,
            color: line
            },
            tickAmount: 7
        },
        yaxis: {
            labels: {
            style: {
                colors: [secondary]
            }
            }
        },
        grid: {
            borderColor: line
        },
        tooltip: {
            theme: 'light'
        }
        }));
    }, [primary, secondary, line, theme, data]);

    return (
         <ReactApexChart options={options} series={data} type="area" height={450} />
    )
}

LineChart.propTypes = {
    data: PropTypes.array
};

export default LineChart;