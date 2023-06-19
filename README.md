# Video Call App

This is a video calling application built using React Native, Django, and Voximplant. It provides all the essential features of a video calling app, including user login, signup, and contact list management.

## Features

- User authentication: Users can create an account and log in securely.
- Contact list management: Users can add and manage their contacts for easy video calling.
- Video calls: Users can initiate video calls with their contacts using Voximplant technology.
- Cross-platform: The app is built using React Native, allowing it to run on both iOS and Android devices.

## Prerequisites

Before running the app, ensure you have the following prerequisites:

- React Native development environment set up on your machine.
- Django backend server hosted and running. You can use platforms like PythonAnywhere to host your server.
- Voximplant account and credentials for video call functionality.
- API_URL pointing to your backend server in the Constants.js file.

## Installation

Follow these steps to set up and run the app:

1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/your-username/video-call-app.git

2. Navigate to the project directory.
    ```bash
    cd video-call-app

3. Install the required dependencies.
    ```bash
    npm install

4. Update the API_URL in the Constants.js file located in the frontend code.
    // Constants.js
    export const API_URL = 'https://example.com';

5. Build and run the app on your device or emulator.
    npx react-native run-android # For Android
    npx react-native run-ios # For iOS

Note: Make sure you have your device or emulator connected and properly set up for development.

Configuration
- To configure the backend server and Voximplant, make the following changes:
- Set up your Django backend server using your preferred hosting platform. Update the necessary configurations such as database settings, API keys, and security measures.
- Obtain your Voximplant credentials, including the application ID and API keys. Configure Voximplant with the necessary video call settings and permissions.
- Update the backend server URL in the React Native app to point to your hosted backend. This can be done by updating the API_URL in the Constants.js file.

Screenshots
Here are a few screenshots of the Video Call App:

<div style="display:'flex'; justify-content: 'space-between';">
  <img src="pandacall-frontend/assets/image-1.png" width="240" height="450">
  <img src="pandacall-frontend/assets/image-2.png" width="240" height="450">
  <img src="pandacall-frontend/assets/image-3.png" width="240" height="450">
 </div>

<div style="display:'flex'; justify-content: 'space-between';">
  <img src="pandacall-frontend/assets/image-4.png" width="240" height="450">
  <img src="pandacall-frontend/assets/image-5.png" width="240" height="450">
  <img src="pandacall-frontend/assets/image-6.png" width="240" height="450">
</div>

Contributing
- Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request to this repository.

License
- This project is licensed under the MIT License.

- Make sure to place the sample images (app_screenshot.png, login_screen.png, contact_list.png, video_call.png) in a directory called `images` in the same location as the README.md file. Adjust the image filenames and paths accordingly if needed.
