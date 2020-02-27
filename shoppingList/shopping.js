
// The Vue instance
let app = new Vue({
    // Options

    el: '#app', // reference element in DOM with tag 'app'

    data: {
        // item: null,
        // qty: 1,
        items: {
            qty: 1,
            item: null,
        },
        'list': [], // empty shopping list
        count: 0,
    },
    methods: {
        addList: function () {
            if (!isNaN(this.items.qty)) {
                this.list.push(Object.assign({}, this.items));
                this.count += this.items.qty
                this.items.item = null;
            }
        }

    }
})
