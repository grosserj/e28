# Getting started and using BootstrapVue

## First, what is Bootstrap
*TODO: Basic introduction to bootstrap 4 and a simple example*
Bootstrap is one, if not the most popular, CSS frameworks. It is designed around being mobile friendly and responsive to screen changes. For example, a website using Bootstrap's container/grid system will render and shift content to accomodate the user's device. It will also dynamically change if the viewport changes.

Another facete of Bootstrap is its component library. Components include items such as: 
* decorative buttons
* cards
* carousels
* navbars

bootstrap components are invoked by assigning the bootstrap component's class to the appropriate html element.
Here is an example of invoking a component:
```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```
Src: [https://getbootstrap.com/docs/4.4/components/buttons/]()

Which renders this:
![Bootstrap example of Card component]('./images/bootstrap_card_example.PNG')


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
* [https://getbootstrap.com/]()
* [https://stackoverflow.com/questions/50127800/comparison-between-bootstrap-vue-and-bootstrap-4]()
* [https://bootstrap-vue.js.org/]()
* [https://github.com/bootstrap-vue/bootstrap-vue]()
* [https://blog.logrocket.com/getting-started-with-bootstrapvue-2d8bf907ef11/]()


