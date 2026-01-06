import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { initializeWebSocket, socket } from "./services/websocket";

import Joystick from "./components/Joystick";
import MapView from "./components/MapView";
import ModeSwitch from "./components/ModeSwitch";
import Telemetry from "./components/Telemetry";

export default function App() {
  const [mobil, setMobil] = useState({
    x: 0, 
    y: 0, 
    heading: 0, 
    speed: 0, 
    front_distance: 0
  });

  const [target, setTarget] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket with reconnection
    initializeWebSocket(
      (data) => {
        // Handle incoming messages
        if (data.type === "telemetry") {
          setMobil(data.data);
        } else if (data.type === "new_waypoint") {
          setTarget({ x: data.data.target_x, y: data.data.target_y });
        } else if (data.type === "connected") {
          setConnected(true);
          console.log("✅ Connected to backend");
        }
      },
      () => setConnected(false)
    );

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚗 IoT Mobil Mobile</Text>
        <View style={[styles.statusDot, connected && styles.statusDotConnected]} />
      </View>

      <ModeSwitch />
      <Telemetry mobil={mobil} />
      <MapView mobil={mobil} target={target} setTarget={setTarget} />
      <Joystick />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff'
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff3838'
  },
  statusDotConnected: {
    backgroundColor: '#00ff88'
  }
});