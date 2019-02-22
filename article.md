Understand the RestFul API with NodeJS and MongoDB

As a modern developer is worth to know what is Restful API and how to write one. In this article I will take you through the full porcess of creating a Restful API using the most dominant technoogies that are trending the web developement today says NodeJS and MongoDB. We will build a traditional CRUD Restful API of a simple Todo Application. 

Yeah, if you are new here, I will recommend you to first go through this article that actually show how to build intutive UI design with angular and angular-material-design of this app. For consistency, we will continue the developement of the same app with the backend part today and probaly the api intergration in our article of the next week.

What is a Restful API?
...

App refactoring (not mandatory of you just want to learn API development)
If actually follow that article on learning angular7 by building a todo app, you should have noticed that the creation of a todo require only one text input fied which take the desciption of wht todo. Let's refactor our code to make our app more useful by adding two input field instead of one. We can have a text field for the title and then another field texterea for the description of the task todo.

W'll have a couple of file to touch here, let's start by changing our html caode to add the two fields. open the file app/addtask/addtask.component.html and change it content to reflect the snippet bellow.

<h2 mat-dialog-title>Add a new todo</h2>
<mat-dialog-content>
    <mat-form-field class="example-full-width">
      <input matInput placeholder="todo Title" [(ngModel)]="data.title" #data="ngModel" >      
    </mat-form-field>
    <mat-form-field class="example-full-width">
      <textarea matInput placeholder="todo description" [(ngModel)]="data.description" #data="ngModel"></textarea>
    </mat-form-field>
</mat-dialog-content>

<mat-dialog-actions>
  <button mat-button (click)="onCancel()">Cancel</button>
  <button mat-raised-button color="primary" (click)="onSave(data)">Save</button>
</mat-dialog-actions>

As you can see the main updates concern the mat-dialog-content section and the we also change the ngModel to passs an object called data.

Next open your app/addtask/addtask.component.ts to update your onSave() method to pass an object as the second argument now:
  onSave(data): void {
    this.myData.addTodo(this.lastId+1, { title: data.title, description: data.description});
    this.dialogRef.close();
  }

Then we go into our service app/todo.service.ts to update the initial todo array variable and the addTodo() method to reflect the following:
  //todo array variable
 todos: any[] = [
    {id: 1, title: 'Hello World!', description: 'welcome to programming concept'}
  ];

  //add todo function
  addTodo(id:number, data:any, ){
    return this.todos.push({id: id, title: data.title, description: data.description});
  }

Finally, we update our listing page to also display the title and the description of each todo list. open app/tasks/tasks.component.html and change it content to this:
<mat-list>
  <h3 mat-subheader>Today</h3>
  <mat-list-item *ngFor="let todo of todos">
    <mat-icon mat-list-icon>watch_later</mat-icon>
    <h4 mat-line>{{todo.title}}</h4>
    <p mat-line> {{todo.description}} </p>
    <span style="position:relative; right: 35x">
          <button mat-button [matMenuTriggerFor]="menu">
              <mat-icon mat-list-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>Edit</button>
            <button (click)="deleteItem(todo.id)" mat-menu-item>Delete</button>
          </mat-menu>
    </span>
    <mat-divider></mat-divider>
  </mat-list-item>
</mat-list>
if you were curious enough, you will have seen we added a new material design component called mat-menu and ti make this work we have to import the menu module in our app.module.ts file:
//inject the module
import {..., MatMenuModule} from '@angular/material';
//import array
imports: [
    ...,
    MatMenuModule
],

that is all your code is now update and should look like the following image.

TODO..............add the image here


Pre Requirements
We are going to build eveything from scratch in other to learn more becasue there are scraftfolding tools we can use to generate a seed starter api.
NodeJS will be used as our server side language and to run node code you need to have it install on your computer. you can read the installion part of my previews article that will work you through that. 
If that is done the next step will be to install mongoDB for our data storage.
It prety easy to do that all you have to do is to just go their official website an follow the instructions depending on your Operenting System.
and finally to easy the manipulation of these within our code we will need to install acouple of node packages such as: express, body-parser, mongoose, cors, and nodemon.

Setting up our Restfull API applcication
assuming you have node and mongodb installed, let's start by creating a folder call /todo-api-app and inside this we create a file call app.js and a folder for our models call /models.
Now, let create our node package file. we will run the following npm command and answer the question by typing them and press enter or just press enter if we want to choose the default answer.

$ npm init (replace this with a code snippet)

After this we should have our package.json file that look similar to this.

TODO ... add the image

We are good to go now, let install all our dependencies by runing the following commands one after another:
$ npm install express --save
$ npm install body-parser --save
$ npm install mongoose --save 

That is all.


Our first code
let's write our "hello world" app with node and mongodb and connect it to our mongo database. Here is how the code look likes:

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect to our mongo db
mongoose.connect('mongodb://localhost/tododb');
const  db = mongoose.connection;


//then we create our first resource
app.get('/', function(req, res){
    res.send('Hello World!');
});

app.listen(3000);
console.log('sever running on port 3000');

To test your app, go into your terminal and navigate you /todo-api-app folder and run the following command.

$ node app.js
 If it shows the string "sever running on port 3000" then, that is good you can now open your browser and navigate to http://localhost:3000 to see you "Hello World" response from your server. Now, let's change our "Hello World!" string to "Welcome to my app" save and refresh you broswer. Ooops no change you have to stop you server with the CTR+X or Control+X then re run the node app.js to start it back before it works.


Avoiding restarting the server
It will be good to also install a live serve that will be automatically reloading our serve when ever we made some changes on our code. let's do it with this command

$npm install -g nodemon

Yeah, we added the -g flag to tell npm to install it globaly so that we can use it everywhere without re-installing it.

you can now just start you server by running this command
$ nodemon aap.js
Now, try making changes you will see that many things are changing right ?
great.

Creating our database
It's time now to respond to our request with data from the mongo database. let's go and run our mongodb, mine is in a /data folder just nivigate to it and run mongo.
