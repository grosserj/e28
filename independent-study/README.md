Independent Study Draft

Share a clickable URL to a working draft of your independent study note set.

Example answer:
https://github.com/susanBuck/e28/blob/master/independent-study/README.md (Links to an external site.)

Note that at this time I will not be grading your draft on the quality of the content, but rather the depth of the content as the purpose of this check-in is to make sure you're on track with the assignment timeline.

Knowing that, your submission will be graded on the following 5 point scale

4-5: Draft shows evidence that student has begun the research process; there's (at minimum) an outline of content and references to outside resources the student is/will be utilizing.

# Getting started and using BootstrapVue

## First What is Bootstrap
*TODO: Basic introduction to bootstrap 4 and a simple example*


## How is Bootstrap different than BootstrapVue and Which Should you use?
There are two distinct parts of Bootstrap, the CSS and the logic. Many of the Bootstrap components only use CSS and some use both CSS and jQuery, providing added functionality.
BootstrapVue on the otherhand does not use any jQuery and is instead written in Vue! This was done so that the BootstrapVue components will continue to be dynamic and controlled by the Vue framework.
Bootstrap 4 uses jQuery 


## Getting Started with BootstrapVue without Build
To incorporate BootstrapVue into your project without using a build system, first, simply include the following `<link>`s and `<script>`s in the ` <head></head> ` section of your html page


```html 
<head>
    <!-- Required Stylesheets -->
    <link
      type="text/css"
      rel="stylesheet"
      href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"
    />
    <link
      type="text/css"
      rel="stylesheet"
      href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"
    />

    <!-- Required scripts -->
    <script src="https://unpkg.com/vue@latest/dist/vue.js"></script>
    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
</head>
```
**Src:** [https://bootstrap-vue.js.org/docs/reference/starter-templates/]()

See section Using BootstrapVue for examples

## Getting Started with BootstrapVue with Build

*TODO: Show how to initalize BootstrapVue when using a build system*

See section Using BootstrapVue for examples

## Examples Using BootstrapVue

*TODO: Provide a few examples of using BootstrapVue components, demonstrating how it integrates with Vue.js*



## Sources
* [https://stackoverflow.com/questions/50127800/comparison-between-bootstrap-vue-and-bootstrap-4]()
BootstrapVue is written in Vue.js!
* [https://bootstrap-vue.js.org/]()
* [https://github.com/bootstrap-vue/bootstrap-vue]()
* [https://blog.logrocket.com/getting-started-with-bootstrapvue-2d8bf907ef11/]()


