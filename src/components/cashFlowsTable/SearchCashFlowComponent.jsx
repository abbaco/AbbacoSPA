import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "react-datepicker/dist/react-datepicker.css";
import CashFlowDataService from '../../services/CashFlowDataService';

class SearchCashFlowComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      minCash: -99999999999,
      maxCash: 99999999999,
      id: null,
      creationDate: "",
      cash: "",
      cashFlowDescription: "",
      cashFlowGroup: 0,
      dropdownOptions: [
        { value: "sueldo", label: "sueldo" },
        { value: "comer", label: "comer" },
        { value: null, label: "Leave empty" }
      ],
      dropdownField: [{ value: "", label: "Select Category..." }]
    };

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }  

  handleStartDateChange = startDate => {
    this.setState({
      startDate
    });
  };

  handleEndDateChange = endDate => {
    this.setState({
      endDate
    });
  };
  

  validate(values) {
    
  }

  onSubmit(values) {
    let cashFlow = {
      startDate: values.startDate,
      endDate: values.endDate,
      minCash: values.minCash,
      maxCash: values.maxCash,
      cashFlowDescription: values.cashFlowDescription,
      cashFlowGroup: values.cashFlowGroup,
    }
    cashFlow.cashFlowGroup = this.state.dropdownField.name;

    CashFlowDataService.searchCashFlows(cashFlow).then(
      retrievedCashFlows => {
          this.props.refreshSearchedCashFlows(retrievedCashFlows)
      }
  )
  }

  render() {
    const { startDate } = this.state;
    const { endDate } = this.state;
    let cashFlowSearchInitialValues = this.state

    return (
      <>
        <Formik
          initialValues={cashFlowSearchInitialValues}
          onSubmit={this.onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validate={this.validate}
          enableReinitialize={true}
        >
          {props => (
            <Form className="row">
              <ErrorMessage
                name="cash"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group col">
                <DatePicker
                  className="form-control"
                  type="date"
                  dateFormat="dd/MM/yyyy"
                  selected={startDate}
                  onChange={this.handleStartDateChange}
                  isClearable
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <DatePicker
                  className="form-control"
                  type="date"
                  dateFormat="dd/MM/yyyy"
                  selected={endDate}
                  onChange={this.handleEndDateChange}
                  isClearable
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </fieldset>
              <fieldset className="form-group col">
              
                <Field
                  className="form-control"
                  type="number"
                  name="minCash"
                  placeholder="Min. Cash"
                />
                <Field
                  className="form-control"
                  type="number"
                  name="maxCash"
                  placeholder="Max. Cash"
                />
              </fieldset>
              <fieldset className="form-group col">
                <Field
                  className="form-control"
                  type="text"
                  name="cashFlowDescription"
                  placeholder="Description"
                />
              </fieldset>

              <fieldset className="form-group col">
                <Select
                  {...this.state.dropdownField}
                  {...props}
                  options={this.state.dropdownOptions}
                  value={
                    this.state.dropdownOptions
                      ? this.state.dropdownOptions.find(
                          option =>
                            option.value === this.state.dropdownField.value
                        )
                      : ""
                  }
                  onChange={option =>
                    (this.state.dropdownField.name = option.value)
                  }
                />
              </fieldset>
              <button className="btn btn-success col" type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }

}

export default SearchCashFlowComponent;
