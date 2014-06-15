# Dave Kilmoyer - Mobile Day Note App

This is a project that accomplishes #2 on the assignment: Notes App
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
* mongoose - uses mongoose abstraction layer to define schema, provide some out of the box validation, and make persisting objects easy
    I selfishly used this as an opportunity to learn it

**client**

* knockout.js for binding
* socket.io (autogen-ed) client library
* bootstrap library for look and feel and 'responsiveness'

## How To Intall
1. Download the repository
2. Install npm modules: `npm install`
3. Install bower dependencies `bower install`
4. Start up the server: `node server.js`
5. View in browser at http://localhost:3000

## Design considerations
Overall I was shooting for a good balance between functionality, a little look and feel (especially looking decent on different devices), and some organization and design of the code.

**server / persistence**

Choosing node for real-time messaging between connected clients was a pretty easy one, and one I wanted to personally use to learn it more.  I've yet to be able to use node.js in production.
There are other options - for examlpe SignalR by Microsoft and client-side polling techniques... but real time messaging is cooler.
On the server, I tried to at least compartmentalize config and routes so it was not ALL dumped in one file.  In the startup file I tried to organize things into sections of similar function for readability.

As far as choosing mongo, the relatively straighforward domain objects scream a document / no-sql persistence solution.  Mongo is great because its json, and json is pretty easy to consume in javascript.
I had a dev account on mongolab, so I figured it was be easiest to use that, especially for others to use.  Mongoose makes it very easy to persist and manipulate objects to mongodb.





If you have any questions or requests email - [kilmoyer@gmail.com](mailto:kilmoyer@gmail.com)

## Design Considerations
- blah
- blah
- blah
- blah
