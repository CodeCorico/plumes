# Plumes

Flying-fast Metro future vision components

[![Microsoft: Productivity Future Vision](http://img.youtube.com/vi/w-tFdreZB94/0.jpg)](http://www.youtube.com/watch?v=w-tFdreZB94)

## Installation

Include the module in your project with :
```
npm install --save plumes
```

For quality version (similar to beta):
```
npm install --save plumes#quality
```

## How to use it

### Compile template files

You can compile and move your Less, JavaScript and HTML files to your ```/public``` folder with Plumes.

To start the gulp watcher, include this code in your *gulpfile.js* then start ```gulp```:

```javascript
var Plumes = require('plumes');

new Plumes({
  paths: {
    features: './features',
    public: './public'
  }
});
```

### Use the components

Plumes contains many Ractive components and CSS layouts. To use it you have to include [Ractive](http://ractivejs.org), [Ractive Require](https://github.com/XavierBoubert/ractive-require) and [jQuery](http://jquery.com):

```html
<script src="http://cdn.ractivejs.org/latest/ractive.js"></script>
<script src="http://cdn.ractivejs.org/latest/ractive-require.js"></script>
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js"></script>
```

Each component is compiled and ready to use in the ```/public``` folder.

## Example

You can try all of the components with the [examples](examples/).
