# Project Structure

This document details the project structure of the Meteor JS app, The Good Cook Book, which is written with 
the Model-View-Controller (MVC) pattern.


The root directory of the project consists of the following directories:

* **.meteor** - automatically generated configuration files

* **client** - Client-facing webpages. The HTML/CSS of the main page is set up here.

* **imports** - This is where all of the front-end logic is stored. Further broken down into the following directories:
    * **api** - This serves as a bridge between the front/back end. Defines API methods that can be called on their
    respective Mongo collections.
    * **model** - Data structures used throughout the project.
    * **controller** - This is where Redux actions and reducers live.
    * **view** - React components and their respective CSS stylesheets.
    
 * **server** - Backend (server-side) components.