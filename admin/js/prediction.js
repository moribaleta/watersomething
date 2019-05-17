class PredictionClass {

    classifier
    sample_data = []
    test_data = []
    training_data = []

    constructor() {

    }

    train() {

    }

    preprocessData() {

    }

    forecast(report) {
        let raw_item = {
            "PH": Number(report.PH),
            "AMMONIA_TOTAL_MGL_N": Number(report.AMMONIA_TOTAL_MGL_N),
            "NITRATE_TOTAL_MGLASN": Number(report.NITRATE_TOTAL_MGLASN),
            "INORGANIC_PHOSPHATE": Number(report.INORGANIC_PHOSPHATE),
            "BOD": Number(report.BOD),
            "DISSOLVED_OXYGEN_MGL": Number(report.DISSOLVED_OXYGEN_MGL),
            "FECAL_COLIFORMS": Number(report.FECAL_COLIFORMS),
        }
        let input = Object.keys(raw_item).map((key) => {
            return raw_item[key]
        })

        let forecast = classifier.forecast([input])
        let computedForecast = computeGrade(forecast)
        return
    }

    getGrade(report) {
        let wqi = computeWQI(report)
        var eq = ""

        if (wqi > 95) {
            eq = "excellent"
        } else if (wqi > 80) {
            eq = "good"
        } else if (wqi > 65) {
            eq = "fair"
        } else if (wqi > 45) {
            eq = "marginal"
        } else {
            eq = "poor"
        }
        return {
            wqi,
            eq
        }
    }

    computeWQI(report) {
        let f1 = computeFunction1(report)
        let f2 = computeFunction2([report])
        let f3 = computeFunction3(report)

        let f1pow = Math.pow(f1, 2)
        let f2pow = Math.pow(f2, 2)
        let f3pow = Math.pow(f3, 2)

        return 100 - (Math.sqrt(f1pow + f2pow + f3pow) / 1.732)
    }


    computeFunction1(report) {
        let n = Object.keys(report).length
        let failed = Object.keys(report).map(key => {
            let value = report[key]
            return getBestWorst(key, value)
        }).filter((item) => {
            return !item.passed
        })
        console.log(failed)

        return (failed.length / n) * 100
    }

    computeFunction2(reports) {
        let n = reports.length

        let failed_reports = reports.map((report) => {
            return Object.keys(report).map(key => {
                let value = report[key]
                return getBestWorst(key, value)
            }).filter((item) => {
                return !item.passed
            }).length
        })

        var sum_failed = 0
        failed_reports.map((count) => {
            sum_failed += count
        })

        let total_test_n = Object.keys(reports[0]).length * n

        return (sum_failed / total_test_n) * 100
    }

    computeFunction3(report) {
        let n = Object.keys(report).length
        let failed_test = Object.keys(report).map(key => {
            let value = report[key]
            return getBestWorst(key, value)
        }).filter((item) => {
            return !item.passed
        })

        let excursions = failed_test.map((test) => {
            return computeExcursion(test)
        })

        var sum_excursions = 0
        excursions.map((excursion) => {
            sum_excursions += excursion
        })
        let normalized = sum_excursions / n
        return (normalized / ((0.01 * normalized) + 0.01))

    }

    computeExcursion(test) {
        if (test.best < test.value) {
            return (test.value / test.best) - 1
        } else {
            return (test.best / test.value) - 1
        }
    }



    computeParam(type, value) {
        let param_value = getBestWorst(type)
        let computed_value = 100 * ((value - param_value.best) / (param_value.worst - param_value.best))
        return computed_value
    }

    getBestWorst(type, value) {
        switch (type) {
            case 'PH':
                return {
                    worst: 8,
                        best: 7,
                        passed: value < 8 && value >= 7,
                        value,
                        type

                }
                case 'AMMONIA_TOTAL_MGL_N':
                    return {
                        worst: 0.27,
                            best: 0.05,
                            passed: value < 0.21 && value >= 0.05,
                            value,
                            type
                    }
                    case 'NITRATE_TOTAL_MGLASN':
                        return {
                            worst: 10,
                                best: 0,
                                passed: value < 8 && value >= 0,
                                value,
                                type
                        }
                        case 'INORGANIC_PHOSPHATE':
                            return {
                                worst: 0.75,
                                    best: 0.06,
                                    passed: value < 0.4 && value >= 0.06,
                                    value,
                                    type
                            }
                            case 'BOD':
                                return {
                                    worst: 100,
                                        best: 2,
                                        passed: value < 6 && value >= 1,
                                        value,
                                        type
                                }
                                case 'DISSOLVED_OXYGEN_MGL':
                                    return {
                                        worst: 0,
                                            best: 10,
                                            passed: value > 4,
                                            value,
                                            type
                                    }
                                    case 'FECAL_COLIFORMS':
                                        return {
                                            worst: 200,
                                                best: 50,
                                                passed: value <= 100,
                                                value,
                                                type
                                        }
        }
    }


}