import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { socket } from "./services/websocket";

import Joystick from "./components/Joystick";
import MapView from "./components/MapView";
import ModeSwitch from "./components/ModeSwitch";
import Telemetry from "./components/Telemetry";

export default function App() {
  const [mobil, setmMbil] = useState({
    x: 0, y: 0, heading: 0, speed: 0, front_distance: 0
  });

  const [target, setTarget] = useState(null);

  useEffect(() => {
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "telemetry") {
        setmMbil(data.data);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ðŸš— IoT Mobil Mobile</Text>

      <ModeSwitch />
      <Telemetry mobil={mobil} />
      <MapView mobil={mobil} target={target} setTarget={setTarget} />
      <Joystick />
    </View>
  );
}