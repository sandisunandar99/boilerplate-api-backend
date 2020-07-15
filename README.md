# Boilerplate API for backend app

## Core Stack

- **Node.js** - [http://nodejs.org/](http://nodejs.org/)
- **Hapi** - [http://hapijs.com/](http://hapijs.com/)
- **Mongo DB** - [https://mongodb.github.io/node-mongodb-native/3.5/](https://mongodb.github.io/node-mongodb-native/3.5/)

## Quick Start

Clone project and install dependencies:
```bash
$ https://github.com/sandisunandar99/boilerplate-api-backend.git
$ cd boilerplate-api-backend
$ docker-compose up --build
```

Start the server (optional if running without docker):
```bash
$ npm start -s
```

Run tests (tester apps):
```bash
$ npm test
```

## Beautiful design structure
```
.
├── api/
|   ├── users/
|   |   └── validations
|   |   |   └── input.js    * Validation when input method
|   |   |   └── output.js   * Output validation
|   |   └── handlers.js     * Sample handler
|   |   └── index.js        * Index
|   |   └── routes.js       * REST User Routes
|   └── index.js        * Index
|   └── helpers.js      * Helpers function
|   └── validations.js  * Validation checker API
├── config/
|   ├── manifest.js   * Server configuration
|   └── cofig.js      * Database/ other configuration apps 
├── auth/
|   └── index.js    * Strategy of API Auth
├── models/
|   └── index.js    * Index
|   └── User.js     * Users model schemas
├── services/
|   └── index.js    * Index
|   └── users.js     * Users service function / controller
├── test/
|   └── index.js    * test apps

```

<a href="https://www.buymeacoffee.com/sandisunandar99" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>


## License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
