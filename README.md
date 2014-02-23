# Try Regex

Try Regex is an interactive regular expressions tutorial inspired by [Try Ruby](http://tryruby.org/) and [Try Haskell](http://tryhaskell.org/). Check it out at <http://tryregex.com/>.

This project was conceived at the [HackKing's Hackathon](http://www.hackkings.org/) in London.

## Installing

Try Regex uses [gulp](http://gulpjs.com/) for building and other development tools, and [bower](http://bower.io/) for package management. To install, run the following:

```
npm install
bower install
```

You will need Node (>= 0.9), npm and bower to be installed.

## Running

It's static HTML, you don't need anything special to serve the files. However, gulp adds a number of tools which make it easier during development. You can run `gulp build` to turn the LESS code into CSS, you can use `gulp lint` to lint your code, and you can use `gulp` to run [browser-sync](http://browsersync.io/) and a LESS watcher to compile and inject changes as they're made.


## License

Try Regex is released under the MIT license.
