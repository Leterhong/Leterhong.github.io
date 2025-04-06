const app = new Vue({
    el: '#app',
    data: {
        searchTerm: '',
        searchResults: []
    },
    methods: {
        searchProjects() {
            fetch(`/search?term=${this.searchTerm}`)
                .then(response => response.json())
                .then(data => this.searchResults = data)
                .catch(error => console.error('搜索失败：', error));
        }
    }
});
