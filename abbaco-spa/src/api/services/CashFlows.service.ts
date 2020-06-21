import axios, { AxiosResponse } from 'axios'
import { ICashFlow } from '../models/CashFlow.model';

const port = '8080'
const CASH_FLOW_API_URL = `http://localhost:${port}/api/cash-flows`

class CashFlowDataService {

    getAllCashFlows(): Promise<AxiosResponse<any>> {
        return axios.get(CASH_FLOW_API_URL);
    }

    public createCashFlow(cashFlow: ICashFlow): Promise<AxiosResponse<any>> {
        return axios.post(CASH_FLOW_API_URL, cashFlow);
    }

    public deleteCashFlow(cashFlowId: number): Promise<AxiosResponse<any>> {
        return axios.delete(`${CASH_FLOW_API_URL}/${cashFlowId}`);
    }
}

export default new CashFlowDataService()