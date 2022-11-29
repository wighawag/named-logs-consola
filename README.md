# introduction

`named-logs-consola` is an implementation of [named-logs facade](https://github.com/wighawag/named-logs) that use npm package "consola" for logging

It use the name of the named-log instance as tag in consola

# install

```bash
npm install named-logs named-logs-consola
```

# use

in your index.js :

```js
import {hookup} from 'named-logs-consola';
hookup();
```

in your code as usual :

```js
import {logs} from 'named-logs';
const console = logs('app:test');

console.log('whatever you want');
console.error('an error occured');
```
