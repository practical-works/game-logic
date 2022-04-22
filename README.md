# 🎮 Game Logic

[![Web](https://img.shields.io/badge/web-blue?logo=w3c)](https://github.com/topics/web)
[![HTML5](https://img.shields.io/badge/html5-blue?logo=html5)](https://github.com/topics/html5)
[![JavaScript](https://img.shields.io/badge/javaScript-blue?logo=javascript)](https://github.com/topics/javascript)

This is an example featuring some useful simple common game development related logic.

[**🌐 View Live**](https://practical-works.github.io/game-logic)

![Screenshot](./screenshot.gif?raw=true)

## 🎯 Achieved Objectives

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
    - [x] Handle mouse **input**.
    - [x] **Move** game object based on input.
- Collision:
    - [x] Detect **point collision** between game objects.
    - [x] Detect **rectangle collision** between game objects.
    - [x] **Stop** moving game object based on collision.
    - [x] Detect **distance** between game objects.
- Data:
    - [ ] Define game **player** data.
    - [ ] Calculate **health percentage** of player.
    - [ ] Calculate **experience** of player based on **level**.

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
    💡 This will by default run a local server on `http://192.168.1.11:8080`.<br />
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