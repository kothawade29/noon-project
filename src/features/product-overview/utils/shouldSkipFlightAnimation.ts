import { AccessibilityInfo } from 'react-native';

export async function shouldSkipFlightAnimation(): Promise<boolean> {
  try {
    return await AccessibilityInfo.isReduceMotionEnabled();
  } catch {
    return false;
  }
}
