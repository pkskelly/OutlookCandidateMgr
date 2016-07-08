## Modifying the Basic Add-in - Buiding the CandidateManager Add-in
The Candidate Manager Add-in is something I thought would serve as a good demo for an OUtlook Add-in.  My responsibilities include hiring new ThreeWill associates, and this often includes dealing with resumes, interviews and recruiting companies. 

The Candidate Manage needs to:
* Load for a very specific type of email 
* If the loading rules are true, then load the data for a Candidate
* Once loaded, query for a Candidate from a SharePoint list by email address
* If a Candidate with the same email exists, present a 'card' with that users information from SharePoint 
* If a Candidate with the same email does not exist, complete a form with the data from the email 
* Provide the ability to edit the data, and submit the Candidate
* Save the Candidate to SharePoint and display the new list item as a 'card'

These are the basic steps for the Add-in.  With this as our guide, we'll go through the process of building an add-in that meets these requirements.

