import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API } from "../services/api";

import { getShadow, RADIUS, rfs, rs, SPACING } from "../utils/responsive";

export default function Joystick() {
  const [speed] = useState(150);
  const [activeBtn, setActiveBtn] = useState(null);

  const send = (cmd) => {
    setActiveBtn(cmd);
    API.post("/mobil/command", { cmd, speed });
  };

  const stop = () => {
    setActiveBtn(null);
    API.post("/mobil/command", { cmd: "stop", speed });
  };

  const ControlButton = ({ direction, icon, style }) => {
    const isActive = activeBtn === direction;
    
    return (
      <TouchableOpacity
        onPressIn={() => send(direction)}
        onPressOut={stop}
        activeOpacity={0.8}
        style={[styles.button, style]}
      >
        <LinearGradient
          colors={isActive 
            ? ['#00d4ff', '#0088ff'] 
            : ['#1e2a4a', '#151d35']
          }
          style={styles.buttonGradient}
        >
          <Text style={[
            styles.buttonIcon,
            isActive && styles.buttonIconActive
          ]}>
            {icon}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#1a2347', '#0f1729']}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>🎮</Text>
        </View>
        <Text style={styles.title}>MANUAL CONTROL</Text>
      </View>

      <View style={styles.joystickArea}>
        {/* Center Circle */}
        <View style={styles.centerCircle}>
          <View style={styles.centerDot} />
        </View>
        
        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          <ControlButton 
            direction="forward" 
            icon="▲"
            style={styles.btnTop}
          />
          
          <View style={styles.rowMiddle}>
            <ControlButton 
              direction="left" 
              icon="◄"
            />
            <View style={styles.spacer} />
            <ControlButton 
              direction="right" 
              icon="►"
            />
          </View>
          
          <ControlButton 
            direction="backward" 
            icon="▼"
            style={styles.btnBottom}
          />
        </View>
      </View>

      <View style={styles.speedInfo}>
        <Text style={styles.speedLabel}>SPEED SETTING</Text>
        <View style={styles.speedValueBox}>
          <Text style={styles.speedValue}>{speed}</Text>
          <Text style={styles.speedUnit}>PWM</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
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
  joystickArea: {
    position: 'relative',
    alignItems: 'center',
    paddingVertical: rs(14, 20, 24),
    minHeight: rs(180, 240, 280)
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: rs(60, 70, 80),
    height: rs(60, 70, 80),
    borderRadius: rs(30, 35, 40),
    marginLeft: rs(-30, -35, -40),
    marginTop: rs(-30, -35, -40),
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8
  },
  controlsContainer: {
    alignItems: 'center',
    width: '100%'
  },
  button: {
    width: rs(56, 70, 80),
    height: rs(56, 70, 80),
    borderRadius: rs(28, 35, 40),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    ...getShadow('#000', 0.3, 4)
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    fontSize: rs(24, 28, 32),
    color: '#8a9bc4'
  },
  buttonIconActive: {
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8
  },
  btnTop: {
    marginBottom: SPACING.md
  },
  rowMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: rs(10, 20, 30),
    marginVertical: SPACING.md
  },
  spacer: {
    width: rs(40, 50, 60)
  },
  btnBottom: {
    marginTop: SPACING.md
  },
  speedInfo: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    padding: rs(10, 12, 14),
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.15)'
  },
  speedLabel: {
    fontSize: rfs(10),
    color: '#8a9bc4',
    letterSpacing: 0.5
  },
  speedValueBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4
  },
  speedValue: {
    fontSize: rfs(18),
    fontWeight: '700',
    color: '#00d4ff'
  },
  speedUnit: {
    fontSize: rfs(10),
    color: '#8a9bc4',
    fontWeight: '600'
  }
});