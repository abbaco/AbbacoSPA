import React, { Component } from 'react';
import { IDropdownPage, IDropdownAPI } from '../api/models/Dropdowns.model';
import CashFlowClassifierDataService from '../api/services/CashFlowClassifiers.service';
import { Formik, Form, Field } from 'formik';
import Nav from 'react-bootstrap/Nav';
import { SelectField } from './SelectField';

class SearchFormComponent extends Component<{refreshCashFlows: any}, { dropdownOptions: Array<IDropdownPage> }> {

  constructor(props: any) {
    super(props)
    this.state = { dropdownOptions: new Array<IDropdownPage>() }

    this.onSubmit = this.onSubmit.bind(this)
    this.refreshCashFlowClassifiers = this.refreshCashFlowClassifiers.bind(this);
  }
  
  public onSubmit(values: any) {
    this.props.refreshCashFlows(values);
  }

  public componentDidMount(): void {
    this.refreshCashFlowClassifiers();
  }

  public refreshCashFlowClassifiers(): void {
    CashFlowClassifierDataService.getAllCashFlowClassifiers()
      .then(
        response => {
          this.setState({ dropdownOptions: this.mapApiDropdownToPage(response.data._embedded?.cashFlowClassifierDtoList) })
        }
      )
  }

  private mapApiDropdownToPage(values: Array<IDropdownAPI>): Array<IDropdownPage> {
    if(!values) return new Array<IDropdownPage>();
    const result = values.map(value => new Object({ value: value.id, label: value.name }));
    return result as IDropdownPage[];
  }

  render() {
    let options = this.state.dropdownOptions;
    return (
      <>
      <div className="col-3">
        <Nav className="d-none d-md-block bg-light sidebar">
          <Formik
            initialValues={Object}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
          >
            {props => (
              <Form className="col-12" >
              <label>Filter List</label>
                
                <Nav.Item className="col-12">

                <label>Date</label>
                  <fieldset className="form-group">
                    <Field
                      className="form-control"
                      type="date"
                      name="minDate"
                      label="minDate"
                      placeholder="Min. Date"
                    />
                    <Field
                      className="form-control"
                      type="date"
                      name="maxDate"
                      label="maxDate"
                      placeholder="Max. Date"
                    />
                  </fieldset>

                </Nav.Item>

                <Nav.Item className="col-12">

                <label>Cash</label>
                  <fieldset className="form-group">
                    <Field
                      className="form-control"
                      type="number"
                      name="minCashAmount"
                      placeholder="Min. Cash"
                    />
                    <Field
                      className="form-control"
                      type="number"
                      name="maxCashAmount"
                      placeholder="Max. Cash"
                    />
                  </fieldset>

                </Nav.Item>
                <Nav.Item className="col-12">
                <label>Description</label>
                  <fieldset className="form-group">
                    <Field
                      className="form-control"
                      type="text"
                      name="title"
                      placeholder="Description"
                    />
                  </fieldset>
                </Nav.Item>

                <Nav.Item className="col-12">
                <label>Classifier</label>
                  <fieldset className="form-group">
                    <Field name={'classificationId'} component={SelectField} options={options} />
                  </fieldset>
                </Nav.Item>

                <Nav.Item className="col-3 offset-8">
                  <button className="btn btn-primary" type="submit">
                    Filter
                  </button>
                </Nav.Item>

              </Form>
            )}
          </Formik>
        </Nav>
        </div>
      </>
    );
  }
}

export default SearchFormComponent;