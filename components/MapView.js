// components/MapView.js
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { sendWaypoint } from "../services/api";
import { getShadow, RADIUS, rfs, rs, SPACING } from "../utils/responsive";

export default function MapView({ target, setTarget }) {
  const [inputX, setInputX] = useState("0");
  const [inputY, setInputY] = useState("0");
  const [isSending, setIsSending] = useState(false);

  const send = async () => {
    try {
      setIsSending(true);
      
      const x = parseFloat(inputX) || 0;
      const y = parseFloat(inputY) || 0;
      
      await sendWaypoint(x, y);
      
      // Update local state
      if (setTarget) {
        setTarget({ x, y });
      }
      
      Alert.alert("Success", `Waypoint sent: (${x.toFixed(2)}, ${y.toFixed(2)})`);
    } catch (error) {
      console.error("Failed to send waypoint:", error);
      Alert.alert("Error", "Failed to send waypoint");
    } finally {
      setIsSending(false);
    }
  };

  const currentTarget = target || { x: 0, y: 0 };

  return (
    <LinearGradient
      colors={['#1a2347', '#0f1729']}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>🗺️</Text>
        </View>
        <Text style={styles.title}>NAVIGATION</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>TARGET WAYPOINT</Text>
        
        {/* Input Fields */}
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>X COORDINATE</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>→</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="#4a5a7a"
                keyboardType="numeric"
                style={styles.input}
                value={inputX}
                onChangeText={setInputX}
              />
              <Text style={styles.inputUnit}>m</Text>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Y COORDINATE</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>↑</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="#4a5a7a"
                keyboardType="numeric"
                style={styles.input}
                value={inputY}
                onChangeText={setInputY}
              />
              <Text style={styles.inputUnit}>m</Text>
            </View>
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity 
          onPress={send}
          activeOpacity={0.8}
          disabled={isSending}
          style={[styles.sendButton, isSending && styles.sendButtonDisabled]}
        >
          <LinearGradient
            colors={isSending 
              ? ['#666666', '#444444']
              : ['#00d4ff', '#0088ff']
            }
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonIcon}>🎯</Text>
            <Text style={styles.buttonText}>
              {isSending ? 'SENDING...' : 'SEND WAYPOINT'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Current Target */}
        <View style={styles.currentTarget}>
          <Text style={styles.currentLabel}>CURRENT TARGET</Text>
          <View style={styles.targetRow}>
            <View style={styles.targetItem}>
              <Text style={styles.targetAxis}>X:</Text>
              <Text style={styles.targetValue}>{currentTarget.x.toFixed(2)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.targetItem}>
              <Text style={styles.targetAxis}>Y:</Text>
              <Text style={styles.targetValue}>{currentTarget.y.toFixed(2)}</Text>
            </View>
          </View>
        </View>
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
  content: {
    gap: SPACING.sm
  },
  sectionTitle: {
    fontSize: rfs(10),
    color: '#8a9bc4',
    letterSpacing: 1,
    marginBottom: 4
  },
  inputsContainer: {
    gap: SPACING.sm
  },
  inputWrapper: {
    gap: 6
  },
  inputLabel: {
    fontSize: rfs(9),
    color: '#8a9bc4',
    letterSpacing: 0.5
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: rs(12, 14, 16),
    height: rs(44, 48, 52)
  },
  inputIcon: {
    fontSize: rs(16, 18, 20),
    marginRight: 8,
    color: '#00d4ff'
  },
  input: {
    flex: 1,
    fontSize: rfs(14),
    color: '#ffffff',
    fontWeight: '600'
  },
  inputUnit: {
    fontSize: rfs(11),
    color: '#8a9bc4',
    marginLeft: 8,
    fontWeight: '600'
  },
  sendButton: {
    marginTop: SPACING.sm,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    ...getShadow('#00d4ff', 0.5, 8)
  },
  sendButtonDisabled: {
    opacity: 0.6
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rs(13, 15, 17),
    gap: 8
  },
  buttonIcon: {
    fontSize: rs(18, 20, 22)
  },
  buttonText: {
    fontSize: rfs(12),
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1
  },
  currentTarget: {
    marginTop: SPACING.sm,
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: RADIUS.sm,
    padding: rs(12, 14, 16),
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.15)'
  },
  currentLabel: {
    fontSize: rfs(9),
    color: '#8a9bc4',
    letterSpacing: 0.5,
    marginBottom: 8
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  targetItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 6
  },
  targetAxis: {
    fontSize: rfs(11),
    color: '#8a9bc4',
    fontWeight: '600'
  },
  targetValue: {
    fontSize: rfs(16),
    fontWeight: '700',
    color: '#00d4ff'
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(138, 155, 196, 0.3)',
    marginHorizontal: 8
  }
});