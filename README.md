# Self adjusting interval
[![npm version](https://badge.fury.io/js/self-adjusting-interval.svg)](https://badge.fury.io/js/self-adjusting-interval)[![Build Status](https://travis-ci.org/unimonkiez/self-adjusting-interval.svg?branch=master)](https://travis-ci.org/unimonkiez/self-adjusting-interval)

## Introdution
javascript's `setInterval` and `setTimeout` are lacking when trying to build an accurate timer, furthermore, javascript's nature of being idle can throw off your timers even more!

> ### Here comes self adjusting timers to the rescue!

Tested on -
* Nodejs
* Browsers
* React Native

## How does it work
Javascript is a scripting language with runs on one process, due to that both `setInterval` and `setTimeout` are not accurate because the process can be busy with other stuff.  

Setting a traditional interval will very quickly will prove itself inaccurate, in this picture you can see the offset which is produced by these functions  
```js
  setInterval(() => { /* Actually called late/early. */ }, 1000);
```
![wrong](https://github.com/unimonkiez/self-adjusting-interval/blob/resources/wrong.jpg)

This library will calculate the delta between callbacks and will aim to hit your expectation every time, very much like a game stepping machanism ([game time accumalation](https://github.com/unimonkiez/game-time-accumulator) is anotehr library I wrote for that)  
![right](https://github.com/unimonkiez/self-adjusting-interval/blob/resources/right.jpg)

Also, javascript can be paused on slowed down to a hault (for example when your user exits your react native app, switching between tabs, or even by rendering UI), so instead of running your callback bunch of times for every missed second, your callback gets to run once with a `ticks` parameter which tells how much to "tick" by  
![batch](https://github.com/unimonkiez/self-adjusting-interval/blob/resources/batch.jpg)
## Usage
* Install
  ```bash
    npm install --save self-adjusting-interval
    # or yarn
    yarn add self-adjusting-interval
  ```
* import and use!
  ```js
  import setSelfAdjustingInterval from 'self-adjusting-interval';

  setSelfAdjustingInterval(ticks => { // number, usually 1 
  // Your code...
  // for example, updating the UI clock with seconds
    addSecondsToClock(ticks);
  }, 1000); // ms
```