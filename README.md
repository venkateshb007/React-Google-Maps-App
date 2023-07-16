# React Maps with Babylon.js Integration
![Project](https://logos-download.com/wp-content/uploads/2016/05/Google_Maps_logo_wordmark.png)


This project combines a React application that utilizes the Google Maps API for displaying a map and capturing images, along with a Babylon.js scene for rendering a 3D cuboid with textures. The React component allows users to capture images of the map and stores them. The latest captured image is then used as a texture for the 3D box in the Babylon.js scene. This integration creates an immersive and interactive experience, showcasing the combination of mapping functionality with a 3D graphics library.

## Features

- Display a Google Maps instance within a React application.
- Capture images of the map at the current view and store them.
- Render a 3D cuboid using Babylon.js library.
- Use the latest captured image as a texture for the 3D box.
- View captured images, remove specific images, and open them in a new tab.

## Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install the dependencies: npm install

4. Obtain a Google Maps API key from the Google Cloud Console and replace "YOUR_API_KEY" with your API key in Map.js and BabylonMap.js files.

5. Start the development server: npm start

## Usage
1. The application will display a Google Maps instance centered at a predefined location.

2. Use the zoom and pan controls to navigate the map to the desired view.

3. Click the "Capture Image" button to capture the current view of the map.

4. The captured image will be added to the list of captured images below the map.

5. Click the "View" button to open a captured image in a new tab.

6. Click the "Cancel" button to remove a specific captured image from the list.

## Technologies Used
- React
- Google Maps API
- Babylon.js
- react-google-maps/api
- react-babylonjs

## Contributing
Contributions are welcome! If you find any issues or would like to contribute enhancements, please submit a pull request.

## Roadmap
- Add additional features such as marker placement and interaction.
- Enhance the 3D rendering with more complex models and materials.
- Improve user interface and responsiveness.
- Implement additional maps and data visualizations.

## Contact
- For any inquiries or feedback, please contact bapu12081996@gmail.com.
