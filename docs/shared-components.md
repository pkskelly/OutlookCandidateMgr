## Enabling Shared Components in Angular 2 Office Addins
One thing that tripped me up for a couple hours was the integration of "shared" modules into the code.  

### Failure is an option
The first attempt was to update the express configuration so that the static files were available.  Made sense, so I edited the server.ts file and added 
a mapping for the "shared" folder.  The interfaces (although never really compiled), the enums and other classes will all come from here over time. 

```javascript
app.use('/shared', express.static(__dirname + '/../shared'));
``` 

and compile and run.  Fail!  The files were being served, I could get to them in a browser, but the error in the developer tools was always returning a 404 or giving me "export" not defined.    

I tried everything I could think of, references in the index.html, changing the path, and many more.  In the end, I came to the conclusion that the answer 
likely lay in the SystemJS and  how it was loading all of the other angular components. Since the "export" error kept making me think that the issue ws related to the module not being found to even be loaded.  
Sad, but when you take a break from coding, these things get rusty.  The index.html had references for core-js and others, but no references for the actual Angular modules.  
This pointed me to the System.config.js file.

After reading the file and then checking the [SystemJS Configuration API](https://github.com/systemjs/systemjs/blob/master/docs/config-api.md#map), the answer had to lie  Add a map reference in the System.config object.  And create a reference to the 

```javascript
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'shared': 'shared/models',  //must add this as a map for other 
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'shared': { main: 'index.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
    };
```


### Making TypeScript Enums Print Nicely in Angular 2
This was great, but the enum values were printing index values instead of something useful for the user.  A quick search found the following 
post which describes how to ensure the string is returned, and can be a bit future proofed for converting my sample data to actual 
web service / api calls. See [How to implement an enum with string values in TypeScript](https://blog.rsuter.com/how-to-implement-an-enum-with-string-values-in-typescript/) for the details. 
