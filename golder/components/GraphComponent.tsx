import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { Colors } from '../constants/Colors'; // Ensure correct import

const screenWidth = Dimensions.get('window').width;

// Define range types
type RangeType = 'weekly' | 'monthly' | 'yearly';

// Function to generate labels
const generateLabels = (range: RangeType): string[] => {
  const today = moment();
  switch (range) {
    case 'weekly':
      return Array.from({ length: 7 }, (_, i) =>
        today.clone().subtract(6 - i, 'days').format('DD/MM')
      );
    case 'monthly':
      return Array.from({ length: 5 }, (_, i) =>
        today.clone().subtract(28 - i * 7, 'days').format('DD/MM')
      );
    case 'yearly':
      return Array.from({ length: 12 }, (_, i) =>
        today.clone().subtract(11 - i, 'months').format('MMM')
      );
    default:
      return [];
  }
};

// Function to generate random data
const generateRandomData = (length: number): number[] =>
  length > 0 ? Array.from({ length }, () => Math.floor(Math.random() * 1000) + 5000) : [0];

const GraphComponent: React.FC = () => {
  const colorScheme = (useColorScheme() as 'light' | 'dark') || 'light'; // Ensures valid type
  const theme = Colors[colorScheme] || Colors.light;

  const [selectedRange, setSelectedRange] = useState<RangeType>('weekly');
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const labels = generateLabels(selectedRange);
  const data = generateRandomData(labels.length);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      {/* Time Range Selector */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {(['weekly', 'monthly', 'yearly'] as RangeType[]).map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => setSelectedRange(range)}
            style={{
              backgroundColor: selectedRange === range ? theme.button : theme.button,
              paddingVertical: 12,
              paddingHorizontal: 20,
              marginHorizontal: 10,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: theme.background, fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph */}
      <LineChart
        data={{
          labels: labels.length > 0 ? labels : ['No Data'],
          datasets: [{ data }],
        }}
        width={screenWidth - 40}
        height={300}
        yAxisLabel=" Rs. "
        chartConfig={{
          backgroundColor: theme.background,
          backgroundGradientFrom: theme.background,
          backgroundGradientTo: theme.background,
          decimalPlaces: 2,
          color: (opacity = 1) => theme.textSecondary,
          labelColor: (opacity = 1) => theme.text,
          style: { borderRadius: 25, paddingRight: 30 },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: theme.button,
          },
          propsForBackgroundLines: {
            strokeWidth: 0.5,
            stroke: theme.button,
          },
        }}
        bezier
        style={{ marginVertical: 10, borderRadius: 25 }}
        onDataPointClick={({ index }) => {
          if (index < data.length) {
            setSelectedPoint(data[index]);
          }
        }}
      />

      {/* Tooltip for selected point */}
      {selectedPoint !== null && (
        <View
          style={{
            position: 'absolute',
            top: 40,
            left: screenWidth / 2 - 70,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 12,
            borderRadius: 10,
            zIndex: 1,
          }}
        >
          <Text style={{ color: theme.button, fontWeight: 'bold', fontSize: 16 }}>
            Price: LKR {selectedPoint}
          </Text>
        </View>
      )}
    </View>
  );
};

export default GraphComponent;
