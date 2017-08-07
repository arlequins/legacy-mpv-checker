# PhantomJS Express example playground

```bash
npm install
npm start
``` 

On Linux `libfontconfig` may be required:

```bash
sudo apt-get install libfontconfig
```

- [localhost:4000/now](http://localhost:4000/now) shows current time
- [localhost:4000/](http://localhost:4000/) renders `/now` page to `./public/images/screenshot.png` via [PhantomJS](http://phantomjs.org)

## Features

- Continuously running PhantomJS instance and page instance (no restart on each request)
- Correctly shutdown PhantomJS process on exit, SIGINT and SIGTERM

## Further more
- [PhantomJS Docs](http://phantomjs.org/documentation/)
- [NodeJS API for PhantomJS](https://github.com/amir20/phantomjs-node)
- [An NPM installer for PhantomJS](https://github.com/Medium/phantomjs)
