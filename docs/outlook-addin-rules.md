## Outlook Activation Rules
Outlook can activate Addins based on rules that determine if the item the user is viewing meets certain criteria. If the item satisfies the rules specified,
then the Addin will be enabled and the user can choose the addin from the Outlook UI to use it with the current item. 

Simple rules are always easy.  Most of the samples will show how to define a simple regular expression or [well known entity](). 
```xml
<Rule xsi:type="ItemHasKnownEntity" 
    EntityType="EmailAddress" />

```
The above rule will activate the addin if the item has a valid email address in the subject or the body of the email. 

In our example, we know we get emails with very specific criteria, so how san we configure more complex rules. For the sample application, I want to check for the following in order to enable the Addin:
- the item must be an email message in read mode
- the item should have an attachment 
- the item should contain a candidates email address
- the item should contain the specific string "Candidate Name"
- the item should contain the specific string "Salary and Rate"

In order to create these rules, and ensure that they are all combined properly, the manifest schema for the Addin allows for complex rule collections. The  following snippet meets all of the above criteria.  

```xml
  <Rule xsi:type="RuleCollection" Mode="And">
        <Rule xsi:type="ItemHasAttachment" />
        <Rule xsi:type="RuleCollection" Mode="And">
            <Rule xsi:type="ItemIs"
                        ItemType="Message"
                        FormType="Read"/>
            <Rule xsi:type="ItemHasKnownEntity"
                        EntityType="EmailAddress"/>
            <Rule xsi:type="RuleCollection" Mode="And">
                <Rule xsi:type="ItemHasRegularExpressionMatch" 
                    RegExName="CandidateName" 
                    RegExValue="Candidate Name" 
                    PropertyName="BodyAsHTML" />
                <Rule xsi:type="ItemHasRegularExpressionMatch" 
                    RegExName="CandidateRate" 
                    RegExValue="Salary and Rate" 
                    PropertyName="BodyAsHTML" />
            </Rule>
        </Rule>
    </Rule>

```
By using the RuleCollection complex type, you can combine the Rule elements using logical operators.  This enables us to specify a set of logical rules that combined meet all of our defined critera.  

The best resource for the Activation Rules that I could find is the [Activation rules for Outlook add-ins](http://dev.office.com/docs/add-ins/outlook/manifests/activation-rules) document in the [Office Dev Center](http://dev.office.com/)

https://dev.office.com/docs/add-ins/outlook/contextual-outlook-add-ins


https://dev.office.com/docs/add-ins/outlook/match-strings-in-an-item-as-well-known-entities
