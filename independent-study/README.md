# Getting started and using BootstrapVue

## First, what is Bootstrap
*TODO: Basic introduction to bootstrap 4 and a simple example*


## How is Bootstrap different from BootstrapVue and which should be used when making an application with Vue.js?
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

See section **Using BootstrapVue** for examples

## Getting Started with BootstrapVue with Build

*TODO: Show how to initalize BootstrapVue when using a build system*

See section **Using BootstrapVue** for examples

## Examples Using BootstrapVue

*TODO: Provide a few examples of using BootstrapVue components, demonstrating how it integrates with Vue.js*



## Sources
* [https://stackoverflow.com/questions/50127800/comparison-between-bootstrap-vue-and-bootstrap-4]()
* [https://bootstrap-vue.js.org/]()
* [https://github.com/bootstrap-vue/bootstrap-vue]()
* [https://blog.logrocket.com/getting-started-with-bootstrapvue-2d8bf907ef11/]()


