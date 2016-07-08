# Building Office Addins using Angular2, TypeScript and Express 
This year, one of my goals is to code more.  In my current role, I am often not directly involved in project development activities, but I do miss developing.  I still code small prototypes, some PowerShell scripts and other hacks, but I wanted to make a concerted effort to work on something, or things, that were more substantial. 

After reading a [recent post from Andrew Connell](http://www.andrewconnell.com/blog/simplifying-technical-presentations-with-docker) and reviewing the GitHub repository [Learning Angular2 to Build Office Add-ins](https://github.com/andrewconnell/pres-ng2-officeaddin) I decided I would get back into coding by diving into TypeScript, Angular2 and Office Addins.  Andrew Connell's project seemed a bit ambitious to start with, since this had even more shiny new things to play with, so I thought I would start by reviewing and "reconstructing" the sample code from theat project. 

This will be more of a series of posts to document the process, learnings, and challenges with jumping back into the deep end of the pool and coding.  I'll try to document things as I move through the process.  

Hopefully this might help someone else, if not, I know I will enjoy the coding! If you learn something, Tweet about it (@pskelly), or link to this repo. If you have an issue, find something wrong, or know of a better way to do something, let me know or send a pull request.  

## 1. [Building a Basic Outlook Addin](build-a-basic-addin)

## 2. [Enabling Shared Components in Angular 2 Office Addins](./docs/shared-components.md)

## 3. [Outlook Add-in Activation Criteria](./docs/outlook-addin-rules.md)

## 4. Updating the CandidateService to filter emails
So at this point, I have a pretty functional set of code to start modifying in my desired direction.  The idea of the addin is to search a SharePoint list
for existing candidates by email that might be coming from a recruiting company.  

Let's filter down to the email. 
be careful with the getEntities calls, they are tricky
    - test for Arrays with instanceOf
    - ensure that you are getting the correct collection of entities with the emailAddresses, addresses, etc. properties

Samples from some sites indicate that the following code shoudl work, but based on my testing this never returned results (correct me if I am wrong).


The best example I could find was in an old post, [Microsoft Office - Exploring the JavaScript API for Office: Mail Apps](https://msdn.microsoft.com/en-us/magazine/dn201750.aspx), which had thefollowing sample which indicates the behavior I am seeing.

```javascript
Office.initialize = function () {
  // Check for the DOM to load.
  $(document).ready(function () {
    var item = Office.context.mailbox.item;
    // Get an array of strings that represent postal addresses in the current item.
    var addresses = item.getEntitiesByType(Office.MailboxEnums.EntityType.Address); 
    // Continue processing the array of addresses.
  });
}
```

Note that theabove sample **does not** indicate that you should then use ``addresses.emailAddresses`` like many other samples do.  

In the end, I could not figure out how to supress TS2339 errors, but rather did the following to ensure the office.service.ts file compiled.  If there is a beter way let me know or send a pull request. 

### Produces TS2339 Error:
```javascript
let entities: Office.Entities = currentEmail.getEntitiesByType(Office.MailboxEnums.EntityType.EmailAddress);               
if(entities instanceof Array){
    this.logService.info('getEntitiesByType(): emails in an array', entities);
    entities.forEach((x:any) => emailAddresses.push(x));
    this.logService.info(' emails pushed into array', emailAddresses);
}
```

### NO TS2339 Error:
```javascript
 let entities: any = currentEmail.getEntitiesByType(Office.MailboxEnums.EntityType.EmailAddress);               
if(entities instanceof Array){
    this.logService.info('getEntitiesByType(): emails in an array', entities);
    entities.forEach((x:string) => emailAddresses.push(x));
    this.logService.info(' emails pushed into array', emailAddresses);
}
resolve(emailAddresses);        
```
Notice the ``let entities: any``  to force TypeScript to allow the use of the Office.Entities interface and the forEach() call. 

## 5.  [Outlook Activation Rules](./docs/outlook-addin-rules.md)

## 6.  [Connecting the Candidate Service](./docs/adding.md)


##  [Useful VS Code Extensions for Developing Addins](./docs/addin-vscode-extensions.md)


##  [Office App Compatibility Kit](https://www.microsoft.com/en-us/download/confirmation.aspx?id=46831)