import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useFont } from '@shopify/react-native-skia';
import { addDays, format } from 'date-fns';
import { CartesianChart, Line } from 'victory-native';

const interRegular = require('./assets/fonts/Inter-Regular.ttf');

const now = new Date();
const firstDayOfTheYear = now.setMonth(0, 1);

const min = 50;
const max = 60;
const maxXCount = 8;

export const App = () => {
  const InterRegular = useFont(interRegular, 14);

  const [data, setData] = useState([
    { day: 1, value: 55 },
    { day: 2, value: 53 },
    { day: 3, value: 57 },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const day = prev.at(-1)!.day + 1;
        const value = Math.floor(min + Math.random() * (max - min));
        return [...prev, { day, value }];
      });
    }, 1000 * 1);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 18 }}>Realtime Chart</Text>

      <View style={{ height: 300, marginTop: 16 }}>
        <CartesianChart
          data={data.slice(Math.max(0, data.length - maxXCount), data.length)}
          xKey="day"
          yKeys={['value']}
          padding={16}
          domain={{ y: [min - 5, max + 5] }}
          domainPadding={{ top: 8, bottom: 8, left: 8, right: 24 }}
          axisOptions={{
            font: InterRegular,
            tickCount: { x: Math.min(data.length - 1, maxXCount), y: 4 },
            labelOffset: { x: 12, y: 8 },
            formatXLabel: (day) =>
              format(addDays(firstDayOfTheYear, day - 1), 'dd.MM'),
          }}
        >
          {({ points }) => (
            <Line points={points.value} color="black" strokeWidth={1} />
          )}
        </CartesianChart>
      </View>
    </View>
  );
};
