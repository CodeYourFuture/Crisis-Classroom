import React from "react";
import PossibleStates from "possible-states";
import Circle from "../../image/spinner-test4.gif";

export default function withFormState(WrappedForm) {
  return class Form extends React.Component {
    state = {
      ui: PossibleStates("initial", "submitting", "success<msg>", "error<msg>")
    };
    toInitial = () =>
      this.setState(({ ui }) => ({
        ui: ui.toInitial()
      }));

    toSuccess = result => {
      const { msg } = result.data;
      this.setState(({ ui }) => ({
        ui: ui.toSuccess(msg)
      }));
    };

    toError = () => {
      this.setState(({ ui }) => ({
        ui: ui.toError(
          "Sorry something happened on the server, please try again later."
        )
      }));
    };

    toSubmitting = () =>
      this.setState(({ ui }) => ({
        ui: ui.toSubmitting()
      }));
    render() {
      return (
        <div>
          {this.state.ui.caseOf({
            initial: () => (
              <WrappedForm
                {...this.props}
                toInitial={this.toInitial}
                toSubmitting={this.toSubmitting}
                toSuccess={this.toSuccess}
                toError={this.toError}
              />
            ),
            submitting: () => (
              <img src={Circle} className="lodin-png" alt="logo" width="50%" />
            ),
            success: ({ msg }) => 
              <div>
                <h6 className="success">{msg}</h6>
                <WrappedForm
                  {...this.props}
                  toInitial={this.toInitial}
                  toSubmitting={this.toSubmitting}
                  toSuccess={this.toSuccess}
                  toError={this.toError}
                />
              </div>
            ,
            error: ({ msg }) =>
              <div>
                <h6 className="error">{msg}</h6>
                <WrappedForm
                  {...this.props}
                  toInitial={this.toInitial}
                  toSubmitting={this.toSubmitting}
                  toSuccess={this.toSuccess}
                  toError={this.toError}
                />
              </div>
          })}
        </div>
      );
    }
  };
}
