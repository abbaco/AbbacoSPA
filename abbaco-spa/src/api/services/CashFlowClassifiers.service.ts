import axios, { AxiosResponse } from 'axios'

const port = '8080'
// const CASH_FLOW_API_URL = `http://localhost:${port}/api/cash-flow-classifiers`
const CASH_FLOW_API_URL = `https://abbaco-api.oa.r.appspot.com/api/cash-flow-classifiers`

class CashFlowClassifierDataService {

    getAllCashFlowClassifiers(): Promise<AxiosResponse<any>> {
        return axios.get(CASH_FLOW_API_URL);
    }

    public createCashFlowClassifier(cashFlowClassifier: any): Promise<AxiosResponse<any>> {
        return axios.post(CASH_FLOW_API_URL, cashFlowClassifier);
    }
}

export default new CashFlowClassifierDataService()