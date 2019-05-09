let home_app = new Vue({
    el: '#home_app',
    data: {
        reports: [],
        table: TableClass
    },
    methods: {
        init(){
            this.getData()
        },
        getData(){
            DataHandlerObject.getReports().then((data) => {
                this.reports = data
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.setTableDisplay()
            })
        },

        setTableDisplay(){
            console.log("here")
            this.table = new TableClass(this.reports)
        }
    }
})

$(document).ready(() => {
    home_app.init()
})