let vm = new Vue({
    el: '#app',
    created() {
        this.getData();
    },
    methods: {
        getData() {
            axios.get('cart.json').then(response => {
                console.log('success');
                
            },err=>{
                console.log(err);
                
            })
        }
    }
})