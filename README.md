# Viewpoint: A Social Media Application

Viewpoint is a social media application inspired by Pinterest, designed to provide users with a platform to discover and share images across various categories. It offers a seamless user experience with features such as efficient search functionality, category-wise filters, and interactive pin interactions.

## Screenshots

![Home Page](https://drive.usercontent.google.com/download?id=1hO2NKJo8QWVYR7mMyCDnMN0J9OtFLKgJ&authuser=0)

![Filter Categores](https://drive.usercontent.google.com/download?id=1tJCNbmqqEn2mnuzhFSH98qYCb8fM9sNa&authuser=0)

## Technologies Used

- Frontend: React.js, Tailwind CSS
- Backend and Data Management: Sanity
- Authentication: Google OAuth 2.0
- Additional Packages: React Icons, Masonry Layout, and other relevant packages

## Features

- Category-wise Filters: Browse images categorized by themes such as cars, nature, watches, and more.
- Efficient Search: Utilizes Sanity Query Language for efficient and accurate search functionality.
- Interactive Pins: Each image is treated as a pin with options to Save, Download, and Like when hovered upon.
- Pin Details Page: Clicking on a pin redirects users to the pin's dedicated page where they can view comments, uploader details, and upload timestamp.
- User Authentication: Seamless user login and logout using Google OAuth 2.0 for easy access and security.

## Getting Started
To run the Viewpoint application locally, follow these steps:

Clone the repository:

Copy code
```bash
git clone https://github.com/yourusername/viewpoint.git
```
Install dependencies:

Copy code
```bash
cd viewpoint
npm install
```
Configure Sanity:

- Set up a Sanity project and configure the necessary schemas for your application.
- Update the Sanity client configuration in the frontend code to connect to your Sanity project.
Set up Google OAuth 2.0:

- Create a project on Google Cloud Platform and set up OAuth 2.0 credentials.
- Configure the Google OAuth client ID and client secret in your application.
Run the application:

bash
Copy code
npm start

## Contributing
Contributions are welcome! If you'd like to contribute to Viewpoint, please fork the repository and submit a pull request with your changes. Be sure to follow the project's code of conduct.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
Special thanks to Pinterest for the inspiration.
Thanks to the creators of React, Sanity, Tailwind CSS, and other open-source technologies used in this project.
