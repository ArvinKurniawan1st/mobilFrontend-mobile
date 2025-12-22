import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { getShadow, isSmallDevice, RADIUS, rfs, rs, SPACING } from "../utils/responsive";

export default function CameraView() {
  return (
    <LinearGradient
      colors={['#1a2347', '#0f1729']}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>📷</Text>
        </View>
        <Text style={styles.title}>LIVE CAMERA</Text>
        <View style={styles.liveDot} />
      </View>

      <View style={styles.cameraWrapper}>
        <View style={styles.cameraContainer}>
          <WebView
            source={{ uri: "http://192.168.100.138:81/stream" }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loading}>
                <Text style={styles.loadingText}>Loading Camera...</Text>
              </View>
            )}
          />
          {/* Corner Frames */}
          <View style={styles.frameTopLeft} />
          <View style={styles.frameTopRight} />
          <View style={styles.frameBottomLeft} />
          <View style={styles.frameBottomRight} />
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
    marginBottom: SPACING.sm,
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
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6
  },
  cameraWrapper: {
    aspectRatio: isSmallDevice ? 4/3 : 16/9,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  cameraContainer: {
    flex: 1,
    position: 'relative'
  },
  webview: {
    flex: 1,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  loadingText: {
    color: '#00d4ff',
    fontSize: rfs(12)
  },
  frameTopLeft: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00d4ff'
  },
  frameTopRight: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#00d4ff'
  },
  frameBottomLeft: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00d4ff'
  },
  frameBottomRight: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#00d4ff'
  }
});