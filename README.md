# 🎮 Game Logic

[![Web](https://img.shields.io/badge/web-blue?logo=w3c)](https://github.com/topics/web)
[![HTML5](https://img.shields.io/badge/html5-blue?logo=html5)](https://github.com/topics/html5)
[![JavaScript](https://img.shields.io/badge/javaScript-blue?logo=javascript)](https://github.com/topics/javascript)

This is a set of examples implementing some useful simple common game development related logic.<br />
It features some techniques for game core logic structuring, layout manipulation, control handling, collision detection, and data calculation.

[**🌐 View Live**](https://practical-works.github.io/game-logic)

![Screenshot1](./screenshot1.gif?raw=true)
![Screenshot2](./screenshot2.gif?raw=true)

## 🎯 Objectives

- Base:
    - [x] Define and render **game screen**.
    - [x] Create and run **game loop**.
    - [x] Define **game object**.
    - [x] Render **basic shape** game object.
    - [x] Render **text** game object.
- Layout:
    - [x] Define **size** (width, height) of game object.
    - [x] Define **position** (x, y) of game object.
    - [x] Define **hotspot** (x, y) of game object.
    - [x] Handle **hotspot-based positioning** of game object.
    - [x] Define and handle **parent-child hierarchy** between game objects.
    - [x] Perform **relative hierarchical positioning** of game objects.
    - [x] **Center** position and hotspot of game object.
    - [x] **Align** game objects in **horizontal** and **vertical** line.
    - [x] **Align** game objects in **grid**.
- Control:
    - [x] Handle keyboard **input**.
    - [x] Read keyboard input **always**.
    - [x] Read keyboard input on **first key press only**.
    - [x] Handle mouse **input**.
    - [x] **Move** game object based on input (keyboard and mouse).
- Collision:
    - [x] Detect **point collision** between game objects.
    - [x] Detect **rectangle collision** between game objects.
    - [x] **Stop** moving game object based on collision.
    - [x] Detect **distance** between game objects.
- Data:
    - [x] Define game **player** data.
    - [x] Calculate **health percentage** of player.
    - [x] Calculate **experience** of player based on **level**.
    - [x] Move game object with **tween** animation effect.
- Movement:
    - [x] Implement basic **top-down movement** (eight directions movement).
    - [x] Add **speed** feature to top-down movement.
    - [x] Add **acceleration** and **deceleration** features to top-down movement.
    - [x] Implement **platformer movement** (side-scroller movement).
    - [x] Add **speed**, **acceleration**, and **deceleration** to platformer movement.
    - [x] Add basic **fixed-height jump** feature to platformer movement.
    - [x] Add **variable-height jump** feature.
    - [x] Add **multiple jump** (double jump or more) feature.

## 🎇 Examples

### Example 0

[▶️ Run Game 0](https://practical-works.github.io/game-logic/game0)

This is the main example that showcases all of the **base**, **layout**, **control**, **collision**, **data**, and **movement/top-down** objectives described above.

To fully check out this example:
- Drag any object with <kbd>🖱️ left mouse button</kbd>.
- Move `😺 actor` object in eight directions with <kbd>⌨️ arrow keys</kbd>.
- Move `■ map` object in eight directions with <kbd>⌨️ wasd keys</kbd>.
- Move `💀 enemy` object to cursor's location with <kbd>⌨️ space key</kbd>.
- Collide `😺 actor` and `💀 enemy` objects to decrease `❤️ health bar`.
- Collide `😺 actor` and `🌾 bottom-field` to increase `❤️ health bar`.
- Collide `😺 actor` and `🌾 top-field` to increase `🏁 experience bar`.
- See `🐭 mouse` cursor coordinates in bottom-right of game screen.
- See `✈ velocity` and `✜ direction` of movement (on x and y axis) in top-left of game screen.

### Example 1

[▶️ Run Game 1](https://practical-works.github.io/game-logic/game1)

This example showcases the **movement/platformer** objectives described above.

To fully check out this example:
- Move `😺 actor` object right or left with <kbd>⌨️ arrow keys</kbd>.
- Make Jump `😺 actor` object with <kbd>⌨️ space key</kbd>.
- Try multiple jumps in air.
- See `✈ velocity` and `✜ direction` of movement (on x and y axis), and `↑ jumps` count (per maximum jumps) in top-left of game screen.

## 🚀 Development

### 🏁 Setup

1. Clone the repository:

    ```bash
    cd somewhere
    git clone https://github.com/practical-works/game-logic.git
    cd game-logic
    ```

2. Run an **HTTP server** (using any tool of your choice) in the root folder:

    For example, using [**HTTP-Server**](https://github.com/http-party/http-server), in the root folder, you can run:
    ```bash
    http-server -c-1
    ```
    💡 This will by default run a local server on `http://localhost:8080`.<br />
    💡 The `-c-1` flag will prevent caching.

### 🏭 Environment

- Runtime: [**Chrome**](https://www.google.com/chrome)
- Editor: [**Sublime Text**](https://www.sublimetext.com)

## 📚 Learning Resources

- 📕 [Anatomy of a video game](https://developer.mozilla.org/en-US/docs/Games/Anatomy)
- 📕 [Implementing game control mechanisms](https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms)
- 📕 [2D breakout game using pure JavaScript](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
- 📕 [JavaScript Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- 📕 [Game development](https://developer.mozilla.org/en-US/docs/Games)
- 📼 [Game-Related Math](https://www.linkedin.com/learning/game-development-foundations-game-related-math)

## 📄 License

[MIT](./LICENSE) © [Ambratolm](https://github.com/Ambratolm)