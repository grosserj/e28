import { expect } from 'chai'
import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import ShowCategory from '@/components/ShowCategory.vue'

// create an extended `Vue` constructor
// add BootstrapVue
const localVue = createLocalVue()
localVue.use(BootstrapVue)


describe('ShowCategory.vue', () => {
  it('shows a category', () => {

    let category = {
      slug: 'learn_nutrition-flashcards',
      name: 'Nutrition Flashcards',
      description: 'Nutrition terms and definitions Flashcards',
      difficulty: 2,
      cards: [
        {
          answer: "appetite",
          question: "the want for food"
        },
        // {
        //   answer: "calorie",
        //   question: "a unit of heat used to measure the energy of your body uses"
        // }
      ]
    }

    let imageWidth = [200, 100];



    const wrapper = mount(ShowCategory, {
      propsData: { category, imageWidth },
      stubs: {
        RouterLink: RouterLinkStub
      },
      localVue
    })



    // Assert our results
    expect(wrapper.text()).to.include(category.difficulty)
    let foundProductLink = wrapper.find('[data-test="category-link"]').exists();
    expect(foundProductLink).to.equal(true);

    const cardComponent = wrapper.find('#card-component')
    expect(cardComponent.exists()).to.equal(true);
    expect(cardComponent.is('div')).to.equal(true);
    expect(cardComponent.text()).to.include(category.name)
    expect(cardComponent.text()).to.include(category.difficulty)

  })
})
