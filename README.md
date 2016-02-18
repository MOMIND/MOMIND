# MOMIND
A free, beautiful and leightweight mind map app for isntant collaboration in Meteor and React. 
*Uses ES6/7 Style*

## Use

#### Node.js

`npm` and `node` with newest version, preferably without sudo, is required and recommended.

If there are problems, make sure to deinstall exisiting `node`, `n` and `npm`. 
Deinstall with `apt-get remove` and `auto-remove` and remove any folder found by `which node` and `which npm` with `rm -rf /folder/path`.

Finally remove remaining folders (and afterwards checka gain with `which`):
    `sudo rm -f /usr/local/share/man/man1/node.1`
    `sudo rm -f /usr/local/lib/dtrace/node.d`
    `sudo rm -rf ~/.npm`
    `sudo rm -rf ~/.node`
    `sudo rm -rf ~/.node-gyp`
Download and then install NVM, a Node version manager:
    `curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash`
Install the stable version of Node and make it the default one. Also install 0.12 for "fallback" and legacy:
    `nvm install 0.12`
    `nvm install stable`
    `nvm alias default stable`

#### And now?
- Change into MoMind with `cd MoMind`.
- Download automatically all packages specified in `package.json` with `npm install`. Executing `npm init` is not necessary.
- Launch with `meteor` and go to `http://localhost:3000`.
- Access db in a new terminal windows with `meteor mongo`.

## Packages
- Install new packages either for Meteor with `meteor add` or for React and Node with `npm install --save`. Use only full Version numbers in `package.json` and `packages.json`, not placeholder (like `@`,`^`,..). 
- Create global reference in `*.browserify.js` and, if they need dependencies from Meteor, include them in `*.browserify.options.json`. Place inside `/lib`

## Coding
- Use ES6/7  for js and jsx files. 
- No unnecessary `var`, just `let` and `const`!
- Create React components as `Component.import.jsx` to use all available ES6/7 features *and* `import/export`. 
- Create Properties and state initialization inside the Constructor with `this.state= {};`
- In React ES6 there is no autobind; use `this.* = this.*.bind(this)` for binding `this.`context for methods.
- In React ES6 there are no mixins; use [these](http://blog.jamiter.com/2016/01/28/es6-classes-with-react-mixin-meteor-1-3/) [techniques](http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html) to create Higher-Order Components.
- Use `ReactMixIn(Class.prototype, ReactMeteorData);` at EOF for Meteor Reactive Data mixin support.
- Use `Class.probTypes = {};` and `Class.defaultProps = {};` at EOF for props.
- Use SASS/SCSS instead of plain CSS. WIll be converted automatically.
- Extend from MoComponent for easier import management, binds and props *(not yet implemented)*.

Note: Explicit arrow functions, (static) properties initialization, annotations, `::bind` are not yet supported by the transpiler because they are part of ES7+.

## Folders
- **/client**
Available only on the Client.
*client.js* - Client Code (eg. Startup, Browser, Window, Current User)
*methods.js* - Client Methods and Server Method Stubs
*controller.js* - Formerly 'public/client.js'. Interface between BackEnd and FrontEnd (Unity or React). Defines Globals (for Client)

- **/server**
Available only on the Server.
*server.js* - Server Code (eg. Startup, Secure Data, Secrets)
*methods.js* - Server Only Methods (Private APIs, ...)
*publish.js* - Publishing of Collections

- **/lib**
Loaded first, before anthing else. Loads for both if not in `/client` or `/server`.
*methods.js* - Methods for Server/Client. PreRun on Client, simulated on Server.
*collections.js* - Define Collections for Mongo/MiniMongo for Server and Client.

-  **/public**
Crawler, images, robots. Static Data. Available to the Client

- **/private**
API Keys? Static Data. Available to Server

- **/packages**
Packages by Meteor. 
Contains `npm-container` for including npm packages in Meteor.

- **/node_modules**
Packages downloaded by `npm`.

- **/components**
Contains React Components and ViewController. `*.import.jsx`

## Stuff?
Licence: [*Mozilla Public License 2.0*](http://choosealicense.com/licenses/mpl-2.0/).
