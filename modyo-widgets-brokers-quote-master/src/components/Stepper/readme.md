# Stepper
---
##### Required Props:
1. main-title:
    - Description: Title for the header
    - Type: String
2. steps:
    - Description: Settings for steps
    - Type: Array
    - Array Item Value:
        - Title: String
        - Valid ? Boolean (Optional: To validate 'Next button')
3. @on-exit:
    - Type: Event / Function
    - Description: Handler for on exit event
4. @on-submit:
    - Type: Event / Function
    - Description: Handler for on submit event if custom-submit is not provided

##### Optional Props:
- @on-save: event handler. If not set the button will not be visible
- show-custom-submit-mobile. By default, if a custom submit is provided then it will be shown instead the next step on 
the last step. To show the 'Next step' show-custom-submit-mobile must be 'true'.
- step-index: 
    - Type: Number
    - Description: Sets the step index
- @on-previous:
    - Type: Event / Function
    - Description: Handles the event on previous button clicked.
- @on-next:
    - Type: Event / Function
    - Description: Handles the event on next button clicked.
---
##### Slots:
- step-[number]: Step html definition
- custom-submit: Custom submit html definition