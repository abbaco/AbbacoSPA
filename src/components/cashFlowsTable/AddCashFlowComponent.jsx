import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CashFlowDataService from '../../services/CashFlowDataService';
import Select from 'react-select'

class AddCashFlowComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
          id: null,
          creationDate: "",
          cash: "",
          cashFlowDescription: "",
          cashFlowGroup: 0,
          dropdownOptions: [
            { value: "sueldo", label: "sueldo" },
            { value: "comer", label: "comer" }
          ],
          dropdownField: [
            { value: "", label: "Select Category..." }
          ]
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    validate(values) {
      let errors = {}
        if (!values.cashFlowDescription) {
            errors.cashFlowDescription = 'Enter a Description'
        }
        if (values.dropdownField===null && !values.cashFlowGroup) {
          errors.dropdownField = 'Enter a category'
      }

      return errors
    }

    onSubmit(values) {
        let cashFlow = values
        cashFlow.cashFlowGroup=this.state.dropdownField.name

        if (this.state.id === null) {
            CashFlowDataService.createCashFlow(cashFlow).then(
                () => {
                    this.props.refreshCashFlows()
                }
            )
        } else {
            CashFlowDataService.updateCashFlow(this.state.id, cashFlow).then(
                () => {
                    this.props.refreshCashFlows()
                })
        }
    }

    render() {

        let cashFlowInitialValues = this.state

        return (
          <Formik
            initialValues={cashFlowInitialValues}
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
                  <Field
                    className="form-control"
                    type="date"
                    name="creationDate"
                    label="Date"
                    placeholder="Date"
                  />
                </fieldset>
                <fieldset className="form-group col">
                  <Field
                    className="form-control"
                    type="number"
                    name="cash"
                    placeholder="Cash"
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
                        ? this.state.dropdownOptions.find(option => option.value === this.state.dropdownField.value)
                        : ""
                    }
                    onChange={option => this.state.dropdownField.name= option.value}
                  />
                </fieldset>
                <button className="btn btn-success col" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        );
    }
}

export default AddCashFlowComponent