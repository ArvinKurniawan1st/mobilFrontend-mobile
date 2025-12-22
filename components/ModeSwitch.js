import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API } from "../services/api";

import { getShadow, RADIUS, rfs, rs, SPACING } from "../utils/responsive";

export default function ModeSwitch() {
  const [activeMode, setActiveMode] = useState("manual");

  const switchMode = (mode) => {
    setActiveMode(mode);
    API.post("/mobil/mode", { mode });
  };

  return (
    <LinearGradient
      colors={['#1a2347', '#0f1729']}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.title}>DRIVING MODE</Text>
        <View style={[
          styles.statusBadge,
          activeMode === "auto" && styles.statusBadgeAuto
        ]}>
          <View style={[
            styles.statusDot,
            activeMode === "auto" && styles.statusDotAuto
          ]} />
          <Text style={[
            styles.statusText,
            activeMode === "auto" && styles.statusTextAuto
          ]}>
            {activeMode === "auto" ? "AUTO" : "MANUAL"}
          </Text>
        </View>
      </View>

      <View style={styles.modesContainer}>
        {/* Manual Mode */}
        <TouchableOpacity
          onPress={() => switchMode("manual")}
          activeOpacity={0.8}
          style={[
            styles.modeButton,
            activeMode === "manual" && styles.modeButtonActive
          ]}
        >
          <LinearGradient
            colors={activeMode === "manual" 
              ? ['#00d4ff', '#0088ff'] 
              : ['rgba(30, 42, 74, 0.5)', 'rgba(21, 29, 53, 0.5)']
            }
            style={styles.modeGradient}
          >
            <View style={[
              styles.iconContainer,
              activeMode === "manual" && styles.iconContainerActive
            ]}>
              <Text style={styles.modeEmoji}>✋</Text>
            </View>
            <Text style={[
              styles.modeTitle,
              activeMode === "manual" && styles.modeTitleActive
            ]}>
              MANUAL
            </Text>
            <Text style={[
              styles.modeSubtitle,
              activeMode === "manual" && styles.modeSubtitleActive
            ]}>
              Direct Control
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Auto Mode */}
        <TouchableOpacity
          onPress={() => switchMode("auto")}
          activeOpacity={0.8}
          style={[
            styles.modeButton,
            activeMode === "auto" && styles.modeButtonActive
          ]}
        >
          <LinearGradient
            colors={activeMode === "auto" 
              ? ['#00ff88', '#00cc66'] 
              : ['rgba(30, 42, 74, 0.5)', 'rgba(21, 29, 53, 0.5)']
            }
            style={styles.modeGradient}
          >
            <View style={[
              styles.iconContainer,
              activeMode === "auto" && styles.iconContainerActive
            ]}>
              <Text style={styles.modeEmoji}>🤖</Text>
            </View>
            <Text style={[
              styles.modeTitle,
              activeMode === "auto" && styles.modeTitleActive
            ]}>
              AUTO
            </Text>
            <Text style={[
              styles.modeSubtitle,
              activeMode === "auto" && styles.modeSubtitleActive
            ]}>
              Autonomous Drive
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md
  },
  title: {
    fontSize: rfs(14),
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    paddingHorizontal: rs(10, 12, 14),
    paddingVertical: rs(5, 6, 7),
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  statusBadgeAuto: {
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    borderColor: 'rgba(0, 255, 136, 0.3)'
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  statusDotAuto: {
    backgroundColor: '#00ff88',
    shadowColor: '#00ff88'
  },
  statusText: {
    fontSize: rfs(10),
    fontWeight: '700',
    color: '#00d4ff',
    letterSpacing: 0.5
  },
  statusTextAuto: {
    color: '#00ff88'
  },
  modesContainer: {
    flexDirection: 'row',
    gap: SPACING.sm
  },
  modeButton: {
    flex: 1,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  modeButtonActive: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...getShadow('#00d4ff', 0.5, 8)
  },
  modeGradient: {
    paddingVertical: rs(16, 18, 22),
    paddingHorizontal: rs(12, 14, 16),
    alignItems: 'center',
    gap: SPACING.sm
  },
  iconContainer: {
    width: rs(48, 56, 64),
    height: rs(48, 56, 64),
    borderRadius: rs(24, 28, 32),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  modeEmoji: {
    fontSize: rs(26, 30, 34)
  },
  modeTitle: {
    fontSize: rfs(13),
    fontWeight: '700',
    color: '#8a9bc4',
    letterSpacing: 1
  },
  modeTitleActive: {
    color: '#ffffff'
  },
  modeSubtitle: {
    fontSize: rfs(9),
    color: '#4a5a7a',
    letterSpacing: 0.5
  },
  modeSubtitleActive: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
});