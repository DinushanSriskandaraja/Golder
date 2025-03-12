import React, { useState } from 'react';
import { View, TouchableOpacity, Text, useColorScheme, Dimensions, Animated, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { Colors } from '../constants/Colors'; // Verify path

const screenWidth = Dimensions.get('window').width;

type RangeType = 'weekly' | 'monthly' | 'yearly';

const generateLabels = (range: RangeType): string[] => {
  const today = moment();
  switch (range) {
    case 'weekly': return Array.from({ length: 7 }, (_, i) => today.clone().subtract(6 - i, 'days').format('DD/MM'));
    case 'monthly': return Array.from({ length: 5 }, (_, i) => today.clone().subtract(28 - i * 7, 'days').format('DD/MM'));
    case 'yearly': return Array.from({ length: 12 }, (_, i) => today.clone().subtract(11 - i, 'months').format('MMM'));
    default: return [];
  }
};

const generateRandomData = (length: number): number[] =>
  length > 0 ? Array.from({ length }, () => Math.floor(Math.random() * 1000) + 5000) : [0];

const GraphComponent: React.FC = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] || Colors.light; // Fallback to light if undefined
  const [selectedRange, setSelectedRange] = useState<RangeType>('weekly');
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const labels = generateLabels(selectedRange);
  const data = generateRandomData(labels.length);

  return (
    <LinearGradient colors={[theme.button, theme.background]} style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.rangeSelector}>
          {(['weekly', 'monthly', 'yearly'] as RangeType[]).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range)}
              style={[
                styles.rangeButton,
                { backgroundColor: selectedRange === range ? theme.button : theme.card },
              ]}
            >
              <Text style={[styles.rangeText, { color: selectedRange === range ? theme.buttonText : theme.textSecondary }]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.chartContainer}>
          <LineChart
            data={{ labels: labels.length > 0 ? labels : ['No Data'], datasets: [{ data }] }}
            width={screenWidth - 40}
            height={360}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: theme.card,
              backgroundGradientTo: theme.ctaCard,
              decimalPlaces: 0,
              color: () => theme.button,
              labelColor: () => theme.text,
              style: { borderRadius: 20 },
              propsForDots: { r: '8', strokeWidth: '3', stroke: theme.button },
              propsForBackgroundLines: { strokeWidth: 1, stroke: theme.overlay },
            }}
            bezier
            style={styles.graph}
            onDataPointClick={({ value }) => setSelectedPoint(value)}
          />
        </View>
        {selectedPoint !== null && (
          <LinearGradient colors={[theme.button, theme.overlay]} style={styles.tooltip}>
            <Text style={[styles.tooltipText, { color: theme.buttonText }]}>LKR {selectedPoint}</Text>
          </LinearGradient>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 10,
  },
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  rangeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  chartContainer: {
    paddingTop: 40,
    alignItems: 'center',
  },
  graph: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  tooltip: {
    position: 'absolute',
    top: 80,
    left: screenWidth / 2 - 60,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  tooltipText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GraphComponent;