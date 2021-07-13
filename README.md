# Welcome to AmateurHour!

## What is it?

AmateurHour is a social media app targeted at people who are musicians but do not continue into a music career. As someone who was involved in music for most of my life, the post-school landscape for non-professional musicians is almost non-existent. This app seeks to bridge that gap and connect people so that they can keep playing. This application was completed as a final project for the Eleven Fifty Academy Full Stack Web Development course.

### Check it out!
Deployed link => (https://client-amateurhour.herokuapp.com/)

### Style

The app uses StyledComponents, Reactstrap, and a tiny bit of CSS to create an engaging user experience. 

### Languages/Frameworks

The app implements TypeScript using the React.js framework. Additionally, the project was completed without using hooks, relying instead on React Class Components. Hooks are newer and much less verbose, but project requirements called for Class Components instead.

### Does it CRUD?

It does! AmateurHour utilizes 3 tables from the server (https://github.com/ccmalcom/AmateurHour-Server) and lets the user Create, Read, Update, and Delete on all three. 

### User Roles

This application has 3 user roles: Admin, User, and Test. When you create an account, the default class of 'User' is assigned, and allows you to access all main features of the app. The Admin role has the ability to moderate content and users by editing or deleting posts and profiles. The Test class allows you to try out the app before you register, for those who don't want to commit to registering just yet. 

## Where does the data come from?

I'm so glad you asked! The data pulls from a server deployed via heroku. You can view the source code here => (https://github.com/ccmalcom/AmateurHour-Server)

## What's next?

Of course, a project is never actually complete. In future versions, I would like to add the ability to send messages to other users, add friends, upload profile pictures, and change profile styles. 