## Getting Started

To get you started you can simply clone the project

### Prerequisites

You need git to clone repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

You need to install global, bower, gulp and typings

$npm install -g bower

$npm install -g gulp

$npm install -g typings

### Resolving dependencies

Running the command npm install out of the root folder to install all development and scripting dependencies.

$npm install

Running the command bower install out of the root folder to install all app-dependencies.

$bower install

Running the command tsd install out of the root folder to install all typescript-definitions.

$typings install

after that run the gulp-script to build the application by executing

$gulp startServer

now the project lies in the build folder and is available under [http://localhost:9000/](http://localhost:9000/)
