# noon-project

Expo (React Native) shop demo: product grid, shared-element hero into a focus-style image carousel, Zustand cart, header badge pulse, and add-to-cart flying thumbnail.

## Run

```bash
npm install
npx expo start
```

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

- Tapping a product uses a **shared transition** from the grid image into the **first** detail photo so it reads as one image moving, not a hard cut.
- Other photos sit in a **horizontal carousel**; the centred slide is a bit **larger and more opaque** so the active image is obvious while you swipe.
- **Add to cart** doesn’t open a cart screen—we **bounce the bag** in the header and **fly a small square** of the product image into it so feedback still feels clear.
- With **Reduce Motion** on, we **skip the fly**; the item still adds and the **badge updates**.
- The **list → detail spring** is intentionally a little **soft** so the transition is easy to follow—we can tighten it after you’ve tried it on device.
