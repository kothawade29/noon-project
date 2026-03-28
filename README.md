# noon-project

Expo (React Native) shop demo: product grid, shared-element hero into a focus-style image carousel, Zustand cart, header badge pulse, and add-to-cart flying thumbnail.

## Technical stack

| Layer | Choice |
|--------|--------|
| **Runtime** | **React Native 0.83.4** via **Expo SDK 55** (canary toolchain in this repo) |
| **UI** | **React 19.2**, **TypeScript 5.9** |
| **Navigation** | **React Navigation 7** — `@react-navigation/native`, **native stack** |
| **Gestures** | **react-native-gesture-handler** ~2.30 |
| **Animations** | **react-native-reanimated 4.2.1** (UI-thread `SharedValue`, `useAnimatedStyle`, `useAnimatedScrollHandler`, `SharedTransition` / shared tags, springs & timing) |
| **Images** | **expo-image** |
| **State** | **Zustand 5** — composed slices for catalog + cart (`src/store/`) |
| **Other** | **react-native-screens**, **react-native-safe-area-context**, **@expo/vector-icons** |

## Run

```bash
npm install && npx expo start
```

Use `i` / `a` in the CLI for iOS simulator or Android emulator once the bundler is running.

## Known limitations and trade-offs

- **Catalog** is **in-memory mock data** only; there is no API, persistence, or offline sync.
- **Cart** stores **product IDs in a flat list** (each tap appends an entry). There are **no line quantities, merges, or a cart screen**—intentionally minimal for the demo scope.
- **Shared hero transition** is wired only between the **grid thumbnail** and **the first carousel slide** (`sharedTransitionTag` must match a single pair). Other gallery images use the same carousel motion but **do not** participate in the shared-element transition.
- **Product overview carousel** uses **`removeClippedSubviews={false}`** so side “peek” slides stay laid out correctly; that trades a bit of **memory** for **layout stability** during horizontal scrolling.
- **Add-to-cart flight** uses **`measureInWindow`** plus a short-lived overlay. If layout isn’t ready or **Reduce motion** is enabled, the flight is **skipped** while the cart still updates—**accessibility and robustness** over a strictly identical visual every time.
- **Expo / RN canary** versions may differ slightly from stable release behaviour; pin versions if you need production parity.

## Performance (animations)

Hero transition (`SharedTransition` + `sharedTransitionTag`), carousel focus/parallax (`useSharedValue` + `useAnimatedScrollHandler` + per-slide `useAnimatedStyle`), cart badge pulse (`withSpring` / `withSequence`), and flying thumbnail (`withTiming` + `useAnimatedStyle`) are driven by **Reanimated 4** on the **UI runtime**, not per-frame JS `setState`. During development, FPS was spot-checked with the React Native **Performance Monitor** (dev menu → *Show Perf Monitor*) while scrolling the carousel and repeating add-to-cart; the flying overlay only mounts once per gesture, not on every animation frame.

---

## Design liaison note

**To:** Lead Product Designer  
**Subject:** Shop motion — shared hero, carousel focus, and add-to-cart feedback  

We implemented list-to-detail with a **Reanimated shared transition** from the grid hero to the **first** gallery frame so the handoff feels like one surface; additional images sit in the same horizontal carousel with **scroll-linked scale and opacity** so the centred card reads as “in focus” without extra UI. For add-to-cart (without a cart screen), the **header bag springs** on each add and a **square thumbnail flies** on a timed path into that anchor for clear feedback. **Reduce Motion** skips the flight but still updates the cart and badge—that’s the accessibility trade-off we chose over identical visuals for everyone. The **hero spring** is tuned for a **readable morph** rather than maximum stiffness; we can iterate damping and duration once we lock reference devices. Happy to align timings with the broader motion system in the next sync if useful.
