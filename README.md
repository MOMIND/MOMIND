# MOMIND
A free, beautiful and leightweight mind map app for instant collaboration in Meteor, React, Redux, jQuery and SASS using ES6/7 and modules.

`[ TOC ]`

## Use
- Change into MoMind with `cd MoMind`.
- Download all packages specified in `package.json` automatically with `npm install`.   
- Launch with `meteor` and go to `http://localhost:3000`.
- Access db in a new terminal windows with `meteor mongo`.

## Environment
#### Software
**React.js**  

**Redux.js**  

**Immutable.js**  

**SASS**  

**jQuery & jQuery UI**  

**browserify.js**  

**externalify.js**  

**SystemJS**

**Node.js**  

#### Node.js and NPM

`npm` and `node` with newest version, preferably without sudo, is required and recommended.  
This is needed for Package Management and using SystemJS modules with browserify.  
  
If there are problems, make sure to deinstall exisiting `node`, `n` and `npm`.  
Deinstall with `apt-get remove` and `auto-remove`.  
Remove any folder found by `which node` and `which npm` with `rm -rf /folder/path`.  
Finally remove remaining folders:  
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

#### Packages
- Install new packages either for Meteor with `meteor add` or for React and Node with `npm install --save`.  
Use only full version numbers in `package.json` and `packages.json`, not placeholder (like `@`,`^`,..). 
- Create global reference in `*.browserify.js` and, if they need dependencies from Meteor, include them in `*.browserify.options.json`. Place inside `/lib`

## Architecture

#### Coding Style
- Use ES6/7 for js and jsx files. 
- No unnecessary `var`, just `let` and `const`!
- Create React Components as `Component.import.jsx` to use all available ES6/7 features *and* `import/export`. 
- Create properties and state initialization inside the constructor with `this.state= {};`
- In React ES6 there is no autobind; use `this.* = this.*.bind(this)` for binding `this.`context for methods.
- In React ES6 there are no mixins; use [these](http://blog.jamiter.com/2016/01/28/es6-classes-with-react-mixin-meteor-1-3/) [techniques](http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html) to create Higher-Order Components. Also, see `RMixIn` Component for legacy.
- Use `RMixIn(Class.prototype, ReactMeteorData);` at EOF for Meteor Reactive Data MixIn support.
- Use `Class.propTypes = {};` and `Class.defaultProps = {};` at EOF for props.
- Use SASS/SCSS instead of plain CSS. Will be converted automatically.
- Extend from MoComponent for easier import management, binds and props *(not yet implemented)*.
- Write Comments, stay in style, be modular and beautiful. :)

Note: Explicit arrow functions, (static) properties initialization, annotations, `::bind` are not yet supported by the transpiler because they are part of ES7+ and not finalized.

#### Folders
- **/client**  
Available only on the Client.  
*client.js* - Client Code (eg. Startup, Browser, Window, Current User)  
*methods.js* - Client-Only Methods and Server Methods Stubs  
*controller.js* - Formerly 'public/client.js'. Interface between BackEnd and FrontEnd (Unity or React). Defines Globals (for Client)  
*/css/main.scss* - SASS Folder with 'Entrypoint' for all Style. Component Styling goes in new file `Component.scss`.
*/lib/* - Loads before anything else. Contains `browserify` for Dependencies and Imports like React Components.

- **/server**  
Available only on the Server.  
*server.js* - Server Code (eg. Startup, Secure Data, Secrets)  
*methods.js* - Server Only Methods (Private APIs, Secrets, ...) 
*publish.js* - Publishing of Collections  

- **/lib**  
Loaded first, before anthing else. Loads for both if not in `/client` or `/server`.  
*methods.js* - Methods for Server/Client. PreRun on Client, simulated on Server.  
*collections.js* - Define Collections for Mongo/MiniMongo for Server and Client.  

-  **/public**  
Crawler, images, robots, fonts. Static Data. Available to the Client.  

- **/private**  
API Keys? Static Data. Available to Server.  

- **/packages**  
Packages for Meteor.  
Contains `npm-container` for including npm packages in Meteor.  

- **/node_modules**  
Packages downloaded by `npm`.  

- **/components**  
Contains React Components. Files must end in `*.import.jsx`(ES6) or `*.import.js`(ES5) and contain `default` export.  

## License
Licence: [*Mozilla Public License 2.0*](http://choosealicense.com/licenses/mpl-2.0/).  

