import axios, { AxiosResponse } from 'axios'

const CASH_FLOW_API_URL = `${process.env.REACT_APP_API_URL}cash-flow-classifiers`

class CashFlowClassifierDataService {

    getAllCashFlowClassifiers(): Promise<AxiosResponse<any>> {
        return axios.get(CASH_FLOW_API_URL);
    }

    public createCashFlowClassifier(cashFlowClassifier: any): Promise<AxiosResponse<any>> {
        return axios.post(CASH_FLOW_API_URL, cashFlowClassifier);
    }
}

export default new CashFlowClassifierDataService()