const domain = "http://192.168.254.100/"
const baseurl = domain + 'watersomething/api/'

class Datahandler {

    fetchApi(url, param = {}){
        return new Promise((resolve,reject) => {
            $.get(url,param,function (data, status) {
                if (status == "success"){
                    resolve(JSON.parse(data))
                }else{
                    reject(status)
                }
            });
        })
    }

    /**
     * returns a promise report from the database
     */
    getReports(){
        let url = baseurl + 'getreports.php'
        return this.fetchApi(url)
    }

}

const DataHandlerObject = new Datahandler()