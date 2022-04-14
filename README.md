# 🎮 Game Logic

[![Web](https://img.shields.io/badge/web-blue?logo=w3c)](https://github.com/topics/web)
[![HTML5](https://img.shields.io/badge/html5-blue?logo=html5)](https://github.com/topics/html5)
[![JavaScript](https://img.shields.io/badge/javaScript-blue?logo=javascript)](https://github.com/topics/javascript)

This is an example featuring some useful simple common game development related logic.

[**🌐 View Live**](https://practical-works.github.io/game-logic)

## 🎯 Achieved Objectives

- Base:
    - [x] Define **game object**.
    - [x] Define **game loop**.
- Layout:
    - [x] Define **position** and **size** for game object.
    - [x] Define **hot point** for game object.
    - [x] **Center** position and hot point of game object.
    - [ ] Align game objects in **horizontal** and **vertical** line.
    - [ ] Align game objects in **grid**.
- Control:
    - [x] Handle game **input**.
    - [x] **Move** game object based on input.
- Collision:
    - [ ] Detect **point collision** between game objects.
    - [ ] Detect **rectangle collision** between game objects.
    - [ ] Detect **distance** between game objects.
- Data:
    - [ ] Define game **player** data.
    - [ ] Calculate **health percentage** of player.
    - [ ] Calculate **experience** of player based on **level**.

## 🚀 Development

1. Clone the repository:

    ```bash
    cd somewhere
    git clone https://github.com/practical-works/game-logic.git
    cd game-logic
    ```

2. Run an **HTTP server** (using any tool of your choice) in the root folder:

    For example, using [**HTTP-Server**](https://www.npmjs.com/package/http-server), in the root folder, you can run:
    ```bash
    http-server -c-1
    ```
    💡 This will by default run a local server on `http://192.168.1.11:8080`.<br />
    💡 The `-c-1` flag will prevent caching.

### 🏭 Environment

- Runtime: [**Chrome**](https://www.google.com/chrome)
- Editor: [**Sublime Text**](https://www.sublimetext.com)

## 📄 License

[MIT](./LICENSE) © [Ambratolm](https://github.com/Ambratolm)