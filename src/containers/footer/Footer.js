import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer sub-footer">
        <footer className="container page-footer font-small blue pt-4 mt-4">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-xs-12 col-sm-4 about">
                <h5 className="text-uppercase">ABOUT CRISIS CLASSROOM</h5>

                <p>
                  Crisis Classroom is a CIC that offers training to volunteers
                  on a not-for profit basis. All profits go into providing
                  funded training opportunities for refugee educators,
                  seed-funding for long-term projects (6months+) and supporting
                  volunteer-led educational classes, courses and projects in the
                  field. We are also a restricted fund under the auspices of
                  Prism the Gift Fund 1099682 which means that all donations
                  receive Gift Aid.
                </p>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <h6 className="text-uppercase">Subscribe us</h6>
                  </div>
                  <div className="col-xs-12 col-sm-6" />
                  <div
                    id="mailer"
                    class="FMSConstructor"
                    data-init="MailerForm"
                  >
                    <div id="form">
                      <form action="/api/mailer/add" method="post" id="subForm">
                        <div class="col-xs-12 col-sm-12">
                          <div className="form-group">
                            <input
                              id="fieldName"
                              class="form-control"
                              name="cm-name"
                              type="text"
                              placeholder="Full name..."
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-9">
                          <div className="form-group">
                            <input
                              id="fieldEmail"
                              class="form-control"
                              name="cm-urdtkir-urdtkir"
                              type="email"
                              placeholder="Email address..."
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                          <button type="submit" className="btn btn-default">
                            GO!
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright py-3 text-center">
            © 2018 Copyright:
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
