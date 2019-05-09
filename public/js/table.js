class TableClass {

    reports_data = []
    table_data = {}

    constructor(reports_data = []) {
        this.reports_data = reports_data
        this.data();
        this.cacheDom();
        this.selectListener();
        //this.initDatePicker();
        this.preprocessData()
        this.setGraphsData();
    }

    preprocessData() {
        let header = Object.keys(this.reports_data[0])

        header.map((column) => {
            if (column != "ID" && column != "USERID") {
                this.table_data[column] = []
            }
        })

        console.log("preprocessed %o", this.table_data)

        this.reports_data.map((data) => {
            header.map((column) => {
                if (column != "ID" && column != "USERID") {
                    if (!this.table_data[column].includes(data[column])) {
                        this.table_data[column].push(data[column])
                    }
                }
            })
        })

        console.log("preprocessed %o", this.table_data)
    }

    data() {
        this.oSearch = {
            start_date: null,
            end_date: null,
            parameter: null
        }
    }
    cacheDom() {
        this.oGraph = document.getElementById('line-graph').getContext('2d');
        this.oDateRangePicker = $('#water-quality-graph').find('.date-picker');
        this.oSelectLineGraph = $('#line-graph-select');
    }

    selectListener() {
        this.oSearch.parameter = this.oSelectLineGraph.val();
        console.log(this.oSearch);
        this.oSelectLineGraph.on('change', function (e) {
            oLineGraph.oSearch.parameter = e.target.value;
        });
    }
    

    initDatePicker() {
        let oStartDate = moment().subtract(29, 'days');
        let oEndDate = moment();

        const fnCallBack = (oStartDate, oEndDate) => {
            this.oDateRangePicker.find('span').html(oStartDate.format('MMM D, YYYY') + ' - ' + oEndDate.format('MMM D, YYYY'));
            this.oSearch.start_date = oStartDate.format('DD/MM/YYYY');
            this.oSearch.end_date = oEndDate.format('DD/MM/YYYY');
            console.log(oStartDate.format('DD/MM/YYYY') + ' - ' + oEndDate.format('DD/MM/YYYY'))
        };

        this.oDateRangePicker.daterangepicker({
            startDate: oStartDate,
            endDate: oEndDate,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, fnCallBack);

        fnCallBack(oStartDate, oEndDate);
    }

    setGraphsData() {

        var reports = this.table_data.STATION.map((station) => {
            let count = this.reports_data.filter((data) => {
                return data.STATION == station
            }).length
            return {
                label: station,
                value: count
            }
        })

        let data = {
            labels: reports.map((report) => {
                return report.label
            }),
            datasets: [{
                label: "Station",
                data:  reports.map((report) => {
                    return report.value
                }),
                backgroundColor: "blue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            }],
        };

        //options
        let options = {
            responsive: true,
            title: {
                display: true,
                position: "top",
                text: "Line Graph",
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            }
        };

        let myLineChart = new Chart(this.oGraph, {
            type: 'bar',
            data: data,
            options: options
        });
    }
};