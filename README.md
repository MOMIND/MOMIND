# MOMIND
A free, beautiful and leightweight mind map app for instant collaboration in Meteor, React, Redux, jQuery and SASS using ES6/7 and modules.

##Table of Contents
- [Use](#use)
- [Architecture](#architecture)
      - [Redux](#redux)
      - [Server Structure](#server-structure)
      - [Browser Extensions](#browser-extensions)
      - [Coding Hints](#coding-hints)
      - [Folders](#folders)
- [Environment](#environment)
      - [Software](#software)
      - [NPM](#npm)
      - [Packages](#packages)
- [Stuff](#stuff)

## Use
- Change into MoMind with `cd MoMind`.
- Download all packages specified in `package.json` automatically with `npm install`.   
- Launch with `meteor` and go to `http://localhost:3000`.
- Access db in a new terminal windows with `meteor mongo`.
- Create (atm) Nodes by Hand, using functions from `client/controller.js`.

## Architecture

#### [Redux](http://redux.js.org/docs/basics/index.html)
The State of the App is saved at a single place, in `Store`, which the `<App>` connects to. All actions which can manipualte the store are defined in `client/lib/actions.import.js` and for every Action there is a Method (a ActionCreator) and a Constant (a Identifier). Every Action is then exported and can be used from `<App>` as `this.props.Actions.action`.  
The State can be accesed from various variables bound as props to `<App>`. These are either defined as a variable, [IList (Immutable List/Array)](https://facebook.github.io/immutable-js/docs/#/List) or [IMap (Immutable List/Map)](https://facebook.github.io/immutable-js/docs/#/Map) from *Immutable.js*.  
Accessing state, mutating state and executing Actions should only happen in `<App>`, as the child components are merely presentational.  
How Actions affect the State is defined in the reducers in `client/lib/reducer.import.js`. Actions msut be dispatched to have an effect on Store.  
**Important**: Actions and Reducers are stateless and pure!
##### Actions
- AddNode(id, text, x, y, root, creator)
- AddSubNode(id, text, x, y, parent, creator)
- RenameNode(id, text)
- MoveNode(id, x, y)
- DeleteNode(id)
- ChangeNodeMode(id, mode)
- CreateLink(parent, child, mode, id)
- RemoveLink(id)
- RemoveLinkByNode(nodeid)
- SetMapId(id)
- SetCreatorId(id)
- SetActiveObject(ref, shape)

####Server Structure
meteor how, what, flow
db how what, structure

####Browser Extensions  
- [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension#implementation) for Google Chrome/Chromium  
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for Google Chrome/Chromium  
- [React Detector](https://chrome.google.com/webstore/detail/react-detector/jaaklebbenondhkanegppccanebkdjlh) for Google Chrome/Chromium  

#### Coding Hints
- Use ES6/7 for js and jsx files. 
- No unnecessary `var`, just `let` and `const`!
- Create React Components as `Component.import.jsx` to use all available ES6/7 features *and* `import/export`. 
- State initialization inside the constructor with `state= {};` or with class-wide (like propTypes) with `static propTypes={};`.
- Alternative: Use `Class.propTypes = {};` and `Class.defaultProps = {};` at EOF for props.
- In React ES6 there is no autobind; use `this.* = this.*.bind(this)` for binding `this.`context for methods.
- In React ES6 there are no mixins; use [these](http://blog.jamiter.com/2016/01/28/es6-classes-with-react-mixin-meteor-1-3/) [techniques](http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html) to create Higher-Order Components.  
Also, see `RMixIn` Component for legacy.
- Use `RMixIn(Class.prototype, ReactMeteorData);` at EOF for Meteor Reactive Data MixIn support.
- Use SASS/SCSS instead of plain CSS. Will be converted automatically.
- Extend from MoComponent for easier import management, binds and props *(not yet implemented)*.
- Write Comments, stay in style, be modular and beautiful. :)

Note: Annotations and `::bind` are not yet supported by the transpiler because they are part of ES7+ and not finalized.

#### Folders
- **/client**  
Available only on the Client.  
*client.js* - Client Code (eg. Startup, Browser, Window, Current User)  
*methods.js* - Client-Only Methods and Server Methods Stubs  
*controller.js* - Formerly 'public/client.js'. Interface between Front/Backend.  Defines Globals (for Client). Could be deprecated in future.  
*/css/main.scss* - SASS Folder with 'Entrypoint' for all Style. Component Styling goes in new file `_Component.scss`.  
*/lib/* - Loads before anything else. Contains `browserify` for Dependencies and Imports like React Components. Contains Redux Reducer and Actions.  

- **/server**  
Available only on the Server.  
*server.js* - Server Code (eg. Startup, Secure Data, Secrets)  
*methods.js* - Server Only Methods (Private APIs, Secrets, ...) 
*publish.js* - Publishing of Collections  

- **/lib**  
Loaded first, before anthing else. Loads for both if not in `/client` or `/server`.  
*methods.js* - Methods for Server/Client. PreRun on Client, simulated on Server.  
*collections.js* - Define Collections for Mongo/MiniMongo for Server and Client.  
*actions.import.js* - Actions and Enums for Redux Store.  
*reducer.import.js* - Reducer for Redux Store. 
*propTypes.import.js* - Custom PropTypes Validators for React.  

-  **/public**  
Crawler, images, robots, fonts. Static Data. Available to the Client.  
*/font* - Obviously Fonts. Use them in main.scss.  
*/img* - Images  

- **/private**  
API Keys? Static Data. Available to Server.  

- **/packages**  
Packages for Meteor.  
Contains `npm-container` for including npm packages in Meteor.  

- **/node_modules**  
Packages downloaded by `npm`.  

- **/components**  
Contains React Components.  
Files must end in `*.import.jsx`(ES6) or `*.import.js`(ES5) and contain `default` export.  

## Environment
#### Software
**React.js** - Fast Frontend Javascript Library with Virtual DOM and Web Components.  
**Redux.js** - Provides a single Store for State and Data to reduce Calls and Flow. Extends classic FLux pattern and works with React. Redux is pure and the Reducers and Actions are stateless.  
**Immutable.js** - Provides better Object Comparison, does not break references for new Objects and helps reducing unnecessary DOM and Component Updates. A Change to an Immutable returns always a exact copy with the changed attribute. If nohing was really changed, reference is not broken.  
**SASS** - Awesome CSS Extension with Functions and modular stylesheets.  
**jQuery & jQuery UI** - More javascript power for everything, includes UI. Also, tons of plugins.  
**browserify.js** - Bundles javascript and works with SystemJS. Transpiles `import/export`.  
**externalify.js** - Transformer for browserify as a connection required dependencies downloaded externally or with Meteor (such as React).  
**SystemJS** - Provides Module loading (ES6+ style) and importing based on `require`.  
**Node.js and NPM** - Packagemanager.  
**Meteor** - Server backend for Syncing States.
#### NPM

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
- Use only full version numbers in `package.json` and `packages.json`, not placeholder (like `@`,`^`,..). 
- Create reference in `*.browserify.js` and, if they need dependencies from Meteor, include them in `*.browserify.options.json`. Place inside `/lib`.

## Stuff
**Licence**: [*Mozilla Public License 2.0*](http://choosealicense.com/licenses/mpl-2.0/).
Icons by [Picol](http://www.flaticon.com/packs/picol-1/6).  
  
**Other Projects**:  
MotEx, a virtual reality driving school for situational awareness. [[1]](https://www.facebook.com/motexproject)[[2]](http://motexproject.at/)  
Street Justice, a reckless, brutal and over-correct police car. [[1]](https://www.facebook.com/streetjusticeat/)[[2]](http://www.streetjustice.at/) 

