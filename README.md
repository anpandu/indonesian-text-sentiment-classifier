# indonesian-news-category-classifier

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

Classify category of an Indonesian news.


## Install

```sh
$ npm install --save indonesian-news-category-classifier
```


## Usage

```js
var cls = require('indonesian-news-category-classifier')
var text = 'Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris.'

cls.predict(text)
/*
{
  "text": "Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris.",
  "scores": [
    ["edukasi", 0],
    ["health", 0],
    ["otomotif", 0.01105690398096329],
    ["travel", 0],
    ["lifestyle", 0.005535347700350083],
    ["techno", 0],
    ["internasional", 0.017679008325458944],
    ["entertainment", 0.037913594950406894],
    ["ibukota", 0.009704732756494333],
    ["bisnis", 0.003148003916906026],
    ["sport", 0.9030505827942292],
    ["nasional", 0.011911825575191133]
  ],
  "prediction": "sport"
}
*/
```

## License

MIT © [Pandu](http://github.com/anpandu)

[npm-image]: https://badge.fury.io/js/indonesian-news-category-classifier.svg
[npm-url]: https://npmjs.org/package/indonesian-news-category-classifier
[travis-image]: https://travis-ci.org/anpandu/indonesian-news-category-classifier.svg?branch=master
[travis-url]: https://travis-ci.org/anpandu/indonesian-news-category-classifier
[daviddm-image]: https://david-dm.org/anpandu/indonesian-news-category-classifier.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/anpandu/indonesian-news-category-classifier
