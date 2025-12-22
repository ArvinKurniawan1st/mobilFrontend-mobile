import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import CameraView from "../../components/CameraView";
import Joystick from "../../components/Joystick";
import MapView from "../../components/MapView";
import ModeSwitch from "../../components/ModeSwitch";
import Telemetry from "../../components/Telemetry";


import { isTablet, rfs, rs, SPACING } from "../../utils/responsive";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
      <LinearGradient
        colors={['#0a0e27', '#1a1f3a', '#0a0e27']}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Text style={styles.carEmoji}>🚗</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>IOT MOBIL</Text>
              <Text style={styles.subtitle}>iDRIVE CONTROL SYSTEM</Text>
            </View>
          </View>

          {/* Mode Switch - Full Width */}
          <ModeSwitch />

          {/* Responsive Grid Layout */}
          {isTablet ? (
            // Tablet: 2 columns
            <View style={styles.grid}>
              <View style={styles.column}>
                <CameraView />
                <MapView />
              </View>
              <View style={styles.column}>
                <Telemetry />
                <Joystick />
              </View>
            </View>
          ) : (
            // Mobile: Single column
            <View style={styles.singleColumn}>
              <CameraView />
              <Telemetry />
              <MapView />
              <Joystick />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0e27'
  },
  gradient: {
    flex: 1
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
    flexGrow: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.xs
  },
  headerIcon: {
    width: rs(48, 56, 64),
    height: rs(48, 56, 64),
    borderRadius: rs(24, 28, 32),
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  carEmoji: {
    fontSize: rs(24, 28, 32)
  },
  headerText: {
    flex: 1
  },
  title: {
    fontSize: rfs(22),
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: rfs(11),
    color: '#00d4ff',
    marginTop: 2,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  },
  singleColumn: {
    gap: SPACING.md,
    marginTop: SPACING.sm
  },
  grid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm
  },
  column: {
    flex: 1,
    gap: SPACING.md
  }
});