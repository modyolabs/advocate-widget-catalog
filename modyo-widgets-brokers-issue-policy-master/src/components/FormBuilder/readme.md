# Form Builder
Builder for form inputs with validations rules (vee-validate) and custom components.

_Dependencies:_
**vee-validate**: https://logaretm.github.io/vee-validate/
**vue-multiselect**: https://vue-multiselect.js.org/
**vue-datepicker**: https://vue-datepicker.netlify.app/
**v-money-no-negative**: https://github.com/vuejs-tips/v-money

---
##### Required Props:
1. fields:
    - Description: Array with the fields by group or single fields. Can contain a title for the group.
    - Type: Array
    - Example (Simple)
    ```javascript
    const formFields = [{
      name: {
        fieldType: 'text',
        rules: 'required',
        label: 'Full Name',
      },
      email: {
        fieldType: 'email',
        rules: 'email',
        mode: 'lazy',
        label: 'Email',
      },
    }]
    ```
    - Example (Grouped)
    ```javascript
    const formFields = [
      // Group 1
      {
        title: 'Personal Details',
        fields: {
          name: {
            fieldType: 'text',
            rules: 'required',
            label: 'Full Name',
          },
          email: {
            fieldType: 'email',
            rules: 'email',
            mode: 'lazy',
            label: 'Email',
          },
        }
      },
      // Group 2
      {
        title: 'Programming Languages',
        fields: {
          programmingLanguages: {
            fieldType: 'select',
            rules: 'required',
            label: 'Favorite Programming Languages',
            options: ['c','c++','c#','java','javascript','python','ruby']
          },
          experienceTime: {
            fieldType: 'text',
            rules: 'required|numeric',
            mode: 'lazy',
            label: 'Years of Experience',
            maxlength:"2",
          },
        }
      }
    ]
    ```
    _**Note:** The object must be inside an array_

###### Field properties
- Required:
  1. fieldType: Field type for the input. _Possible types: **text, email, rut, select, date, month, year, textarea, money.**_
- Optional:
  - **label:** The label for the input.
  - **rules:** (vee-validate) is the validation rules that will be checked against the input.
  - **mode:** (vee-validate) strategy regarding when to validate?.
  - **maxlength:** max length of the input characters.
  - **value:** An initial or default value for the input.
  - **placeholder:** The placeholder of the input.
  - **tooltip:** Text for the tooltip.
  - **settings**: Settings object for datepicker/multiselect, must contain component own properties for binding.

##### Optional Props:
- @can-submit(Boolean isValid): Event handler for form validation changes.

```javascript
<form-builder
  :fields="formFields"
  @update-is-valid="(isValid) => { doSomething(isValid) }" />
```
---
##### Slots:
- #group-title:
  - Description: Slot for the group's title.
  - Props: { groupTitle }

- #label:
  - Description: Slot for the field label
  - Props: { fieldName, label }

- #error:
  - Description: Slot for the field error message
  - Props: { error }

- #tooltip:
  - Description: Slot for the field tooltip
  - Props: { tooltip }

- #input-field:
  - Description: Slot for input field types
  - Props: { fieldData, fieldName }

- #textarea-field:
  - Description: Slot for textarea field types
  - Props: { fieldData, fieldName }

- #money-field:
  - Description: Slot for money field types
  - Props: { fieldData, fieldName }

- #datepicker-field:
  - Description: Slot for datepicker field types
  - Props: { fieldData, fieldName }

- #select-field:
  - Description: Slot for select field types
  - Props: { fieldData, fieldName }