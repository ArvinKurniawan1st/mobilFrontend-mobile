// components/Telemetry.js
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from "react-native";

import { getShadow, RADIUS, rfs, rs, SPACING } from "../utils/responsive";

// Receive mobil data as prop instead of using WebSocket directly
export default function Telemetry({ mobil }) {
  // Use the mobil prop passed from parent
  const telemetryData = mobil || {
    x: 0, 
    y: 0, 
    heading: 0, 
    speed: 0, 
    front_distance: 0
  };

  const MetricCard = ({ icon, label, value, unit, color = '#00d4ff', alert = false }) => (
    <View style={styles.metricCard}>
      <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
        <Text style={styles.metricIcon}>{icon}</Text>
      </View>
      <View style={styles.metricContent}>
        <Text style={styles.metricLabel}>{label}</Text>
        <View style={styles.metricValueRow}>
          <Text style={[styles.metricValue, { color: alert ? '#ff3838' : color }]}>
            {value}
          </Text>
          <Text style={styles.metricUnit}>{unit}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a2347', '#0f1729']}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>📊</Text>
        </View>
        <Text style={styles.title}>TELEMETRY</Text>
      </View>

      <View style={styles.metricsContainer}>
        {/* Position Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POSITION</Text>
          <View style={styles.positionGrid}>
            <MetricCard
              icon="📍"
              label="X"
              value={telemetryData.x.toFixed(2)}
              unit="m"
              color="#00d4ff"
            />
            <MetricCard
              icon="📍"
              label="Y"
              value={telemetryData.y.toFixed(2)}
              unit="m"
              color="#00d4ff"
            />
          </View>
        </View>

        {/* Other Metrics */}
        <MetricCard
          icon="🧭"
          label="HEADING"
          value={telemetryData.heading.toFixed(1)}
          unit="°"
          color="#ff6b35"
        />
        
        <MetricCard
          icon="⚡"
          label="SPEED"
          value={telemetryData.speed.toFixed(2)}
          unit="m/s"
          color="#00ff88"
        />
        
        <MetricCard
          icon="📏"
          label="OBSTACLE"
          value={telemetryData.front_distance}
          unit="cm"
          color="#00ff88"
          alert={telemetryData.front_distance < 30 && telemetryData.front_distance > 0}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    ...getShadow('#00d4ff', 0.3, 8)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: 8
  },
  iconBadge: {
    width: rs(32, 36, 40),
    height: rs(32, 36, 40),
    borderRadius: rs(16, 18, 20),
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  icon: {
    fontSize: rs(16, 18, 20)
  },
  title: {
    flex: 1,
    fontSize: rfs(13),
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1
  },
  metricsContainer: {
    gap: SPACING.sm
  },
  section: {
    marginBottom: SPACING.xs
  },
  sectionTitle: {
    fontSize: rfs(10),
    color: '#8a9bc4',
    marginBottom: 8,
    letterSpacing: 1
  },
  positionGrid: {
    flexDirection: 'row',
    gap: SPACING.sm
  },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: RADIUS.sm,
    padding: rs(10, 12, 14),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: SPACING.sm
  },
  iconCircle: {
    width: rs(36, 40, 44),
    height: rs(36, 40, 44),
    borderRadius: rs(18, 20, 22),
    justifyContent: 'center',
    alignItems: 'center'
  },
  metricIcon: {
    fontSize: rs(18, 20, 22)
  },
  metricContent: {
    flex: 1,
    gap: 2
  },
  metricLabel: {
    fontSize: rfs(9),
    color: '#8a9bc4',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4
  },
  metricValue: {
    fontSize: rfs(18),
    fontWeight: '700'
  },
  metricUnit: {
    fontSize: rfs(10),
    color: '#8a9bc4',
    fontWeight: '600'
  }
});