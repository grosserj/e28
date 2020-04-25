# Project 2
+ By: Joshua Grosserhode
+ Production URL: <http://e28p2.grosserj.club>

## Pages summary
* HomePage - *Displays all the flashcard categories*
* CategoryPage - *Displays a random flashcard from the current category. Has option for **quiz** or **study** mode*
* CreatePage - *Form to add a question/answer to exsiting category, or create a new category*
* AdminPage - *Clear/Seed database*

## SFC summary
* ShowCategory - *component card showing each category in the HomePage*
* ShowAlert - *Display a green alert once a message is passed*
  
## Server interaction
* On HomePage, categories are pulled from Firebase and used to populate the ShowCategory SFC
* On CategoryPage, specific category is pulled using current 'slug' prop
* On CreatePage, form data is uploaded to Firebase

## Outside resources
*Your list of outside resources go here*
* https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case
* https://picsum.photos/
* https://forum.vuejs.org/t/vue-2-0-create-bootstrap-rows-and-cols-with-v-for/5628/5
* https://quizlet.com/301984415/flashcards-flash-cards/
* https://bootstrap-vue.js.org/

