# Dave Kilmoyer - Mobile Day Note App

This is a project that accomplishes #2 on the assignment: Notes App. 
It is supposed to accomplish (my understanding):

1. User can enter a note and its persisted so its available next session
2. If user is connected to the app on multiple devices: once a note is entered on one device, it should appear on any other devices connected 'in a reasonable amout of time'.
3. Be able to be used on both desktop browser and a mobile device.

This application does that for both adding and removing notes.
For the multiple device consideration I chose a web app, and made sure it was responsive and a decent experience on mobile (browser).

## Application technology stack and notes
**server**

* node.js / express / socket.io
* not using jade, but rather serving a single page entry point .html file

**data persistence**

* mongolab - hosted mongodb db service (free dev)
* stores two type of obj documents (users and notes)
* mongoose - uses mongoose abstraction layer to define schema, provide some out of the box validation, and make persisting objects easy.  
    I selfishly used this as an opportunity to learn it

**client**

* knockout.js for binding
* socket.io (autogen-ed) client library
* bootstrap library for look and feel and 'responsiveness'
* jquery for quick and dirty DOM manipulation (mostly styles/css stuff and dom ready)  Bootstrap requires it, but I'm not using bootstrap.js stuff

## How To Intall

    makes two assumptions
    1. you have node installed with npm
    2. bower installed (if not do: npm install bower -g) , although only used for bootstrap stuff currently

1. download the repository
2. naviate to project folder
3. install npm modules: `npm install`
4. install bower dependencies `bower install` or alternatively download boostrap and put in public/libs/[bootstrap] folder
5. start up the server: `node server.js`
6. view in browser at http://localhost:3000

## Design considerations
Overall I was shooting for a good balance between functionality, a little look and feel (especially looking decent on different devices), and some organization and design of the code.

**server / persistence**

Choosing node for real-time messaging between connected clients was a pretty easy one, and one I wanted to personally use to learn it more.  I've yet to be able to use node.js in production.
There are other options - for example SignalR by Microsoft and client-side polling techniques... but real time messaging is cooler.
On the server, I tried to at least compartmentalize config and routes so it was not ALL dumped in one file.  In the startup file I tried to organize things into sections of similar function for readability.

I envisioned only needing one 'single page entry point' for this app, and most to be api/endpoint type handling for the client.  There were going to be two types of work: data 
manipulation (persistence and retrieval), and messaging (with relevant payload).

As far as choosing mongo, the relatively straightforward domain objects scream a document / no-sql persistence solution.  Mongo is great because its json, and json is pretty easy to consume in javascript.
I had a dev account on mongolab, so I figured it was be easiest to use that, especially for others to use.  Mongoose makes it very easy to persist and manipulate objects to mongodb.

**client**

I had a few personal goals the app (not all accomplished):

* its got to work (i know the instructions said its ok to not work but I wanted mine to)

* demonstrate at least some code best practices and/or logic orgainization
    * services (managers) for some of the cross cutting functionality - data service for dealing with domain objects, and a socket service to encapsulate all things related to messaging
    * an app viewmodel that handles the business logic - and brokers data and user interactions for the view.  The view should be free of logic.
    * while I'm not sharing code between server and client, I am using the same domain models, and the data service is an interface into and exposing the server api

* demonstrate use of a framework that uses two way binding for code logic simplification and good user experience

* it should look half-way decent, and the user experience to not be horrible on mobile.

* go above and beyond with user login to access, and even registration

Reach goals:

* go above and beyond with at least some unit tests

* if time do a version using angular (I'm ramping up on that at the moment - and its good practice)

* if time explore some sort of native (probably embedded web view) cordova solution

* not spend too much time (I knew that the writeup, polishing a repo, making sure it was 'installable' by others etc... was going to take time too)

So, I chose knockout.js because I'm familiar with it and it provides two way binding and an MVVM pattern with relatively low overhead.  There's one main app viewmodel.

I chose Bootstrap to meet the needs for a responsive design for multiple devices out of the box.  This UI is pretty simple so it is absolutely overkill, but I didn't want to spend valuable time
mucking with styles... and i wasn't likely to have time to test on lots of clients etc..
For 'services' I saw two real ones, data service (meaning domain object manager), and messenging, and imlpemented those as global singletons.

For app config on page load, i tried to minimize code to 'get the app started'.  See below for more but I definately skimped on a 'main app' module to control this start up and any 
app context that could be needed.  So really all I do is make sure we have the app viewmodel singleton instance and bind it to the form.

Since there's no login, I decided to at least go over the wire mongo and get the users, and default the current session to the 'first' user, so its a real user context.
This happens in the temporary 'seedUser()'.  Upon success, I load that user's notes into the form (as if they'd logged in).  
This best prepares for if there was a login (they login and on success the client would get a valid User object, and their notes would be loaded).
Knockout's binding, via the viewmodel takes care of the rest of updating the ui and reacting to user input and socket messages.

I skimped on any other viewmodels/controllers for other functionality and glombed all into one.  A few other small viewmodel candidates are one for an actual Note, and one for User Auth / Context.
I also skimped on any type of modules, everything is on the host / window object as globals.  I DO use dependency injection for the viewmodel itself - i inject the data and socket service.


## What went wrong, what would I do differently?

* Generally, I should have done the MINIMUM requirements and spent more time on better client code. (see next line for an example)  Then I could have added anything 'above and beyond'.
* The biggest thing thats sticking in my head is what i'm calling the "collossal hack" ** see /services/socketservice.js.   
  If you look in the sockets service, I also have the global socket reference and set up some event handlers.
  I had to call into the viewmodel, so I made it global so it was available in context.  Its pretty 'smelly' but I moved on.  I should have spent more time thinking about an app context and done this differently.
  I'll submit this project on master branch, and if I work on a different solution i'll make a branch and let you know.
* I spent way too much time troubleshooting one issue with knockout binding (nuance between child binding in observable array, difference between click and text binding).
  There are several hacks easily implemented, but I kept trying to do it the knockout way, and that cost a lot of time.
  
* (Related to the next one) Somehow I got it my head to use io.sockets.emit() on the server, which broadcasts to all clients vs. socket.broadcast, which messages all clients except itself.
  While I'm no node/socket.io expert, I know that I knew that at some point :-).  Anyway, I was in the middle of rocking out a system to track connected clients with their ids and emitting
  messages to only others when I remembered(?) socket.broadcast.  Waste of time.
* Sometimes I need to slow down and read the docs better.  For example, some of the bootstrap existing classes did exactly what I needed, and i only discovered them after 
  after the fact, or looking for something else.
* I really think at least a few tests would have saved time - some client api tests hacked together to always test the api / json for example. 
* Didn't meet all of my goals (not login), and didn't get to any 'reach' goals - I guess I over committed in my head :-)
* Know your tools! : I use pycharm for work and knew how awesome the testing is for node server code. Two things cost me time tho...
    1. I was mucking around with remote debugging and the weird chrome extension client debugging - becuse it was 'there'.  Much better to keep node server running in debug, and use chrome dev tools or the like
       to debug client side js, and then set breakpoints as needed to test specific server side.  (that heavy remote debugging DOES work though amazingly)
    2. Once in a while pycharm / node would get buggered, and I know now that i had to kill the node process, but until then there was some bizarre behavior and time spent realizing what the issue is.
* Even though I told myself not to, and requirements said the same, net I spent way to much time on look and feel (not that its that great! :-) )
  I couldn't help doing some stuff, but looking back that was silly and only for my benefit.
  
  
  ## update:
  In hindsight now I think the client data service is prime candidate for promises instead of the callback method I used.  Maybe I'll add that to my future list.



If you have any questions or requests email - [kilmoyer@gmail.com](mailto:kilmoyer@gmail.com)

