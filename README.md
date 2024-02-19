# Sudoku App

<div align='center'>
    <img src='./assets/demo.gif' width='200'>
</div>

<br>

This sudoku app is a remake of the [sudoku web app](https://github.com/wyhong3103/sudoku) that I built using Vanilla JS 2 years ago with some new functionalities. 

The main objective for building this app is to learn and apply things that I am interested in and have never done before, such as building a mobile app (React Native), implementing a CI/CD pipeline (GitHub Actions), containerizing an application (Docker), deploying a container in the cloud (AWS ECS & ECR), making a sudoku recognizer (OpenCV + PyTorch) and others.

It has been challenging to me because all of the things mentioned above were fairly new to me, so it was quite a lot to pick up and half of the time I spent was just on debugging alone. It's not the best-looking app nor the best-functioning app, but I am pretty content with it.

## The Hows

- The sudoku recognition is based on one of my [repository](https://github.com/wyhong3103/sudoku-recognition). Write-ups of the approach are included.
- The sudoku solving/hinting algorithm is based on the algorithm I implemented in the previous sudoku app. It's a simple backtracking algorithm.

## Tech Stack

- Frontend: React Native, [Ignite Boilerplate](https://docs.infinite.red/ignite-cli/), JavaScript
- Backend: OpenCV, PyTorch, Numpy, Flask, Pytest, Python
- DevOps: GitHub Actions, AWS ECS & ECR, Docker

## Local Development

If you wish to start a local development server and play around with this app, here are the instructions

1. Clone this repository.

```
git clone git@github.com:wyhong3103/sudoku-app.git
```

2. Change directory to the `backend` folder. 

```
cd backend
```

3. Install the backend dependencies.

```
pip install -r requirements.txt
```

4. Start the backend server.

```
python app.py
```

5. Change directory to the frontend folder. (Assuming you're currently in the `backend` folder)

```
cd ../frontend
```

6. Install the frontend dependencies.

```
yarn
```

7. Replace the backend API url in `frontend/.env`.

```
EXPO_PUBLIC_API_URL=http://192.168.0.175:3030
```

8. Start the frontend expo app.

```
yarn start
```

Now you can either use an emulator or your phone to access the mobile app.