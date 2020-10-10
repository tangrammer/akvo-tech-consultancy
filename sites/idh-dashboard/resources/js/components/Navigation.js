import React, { Component } from "react";
import { redux } from "react-redux";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../reducers/actions";
import { Navbar, Nav, NavDropdown, Container, Dropdown, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.renderCountries = this.renderCountries.bind(this);
    }

    changePage(key) {
        let page = key.split("/");
        let subpage = page[1] ? page[1] : false;
        window.scrollTo(0, 0);
        this.props.page.change(page[0], subpage);
        return true;
    }

    renderCountries() {
        return this.props.value.page.filters.map((c) => (
            <NavDropdown.Item key={c.name} eventKey={"country/" + c.name} href={"#country/" + c.name}>
                {c.name}
            </NavDropdown.Item>
        ));
    }

    render() {
        let page = this.props.value.page;
        let user = this.props.value.user;
        let loginText = user.login ? user.name.split(" ")[0] : "Login";
        return (
            <Navbar fixed="top" variant="light" className="NavBlue" expand="lg" style={{ padding: "0px" }}>
                <Navbar.Brand href="#home" style={{ padding: "0px" }}>
                    <Image src={"images/logo-farmfit.png"} height="60px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto" activeKey={page.name} onSelect={this.changePage}>
                        <Nav.Link eventKey="home" href="#home" active={"home" === page}>
                            Home
                        </Nav.Link>
                        {user.login ? (
                            <>
                                <NavDropdown active={"country" === page.active} title="Country">
                                    {this.renderCountries()}
                                </NavDropdown>
                                <Nav.Link eventKey="compare" href="#compare" active={"compare" === page.active}>
                                    Compare
                                </Nav.Link>
                            </>
                        ) : (
                            ""
                        )}
                    </Nav>
                    <Nav className="justify-content-end" activeKey={page.name} onSelect={this.changePage}>
                        <Nav.Item>
                            <Nav.Link eventKey="login" href="#login" active={"login" === page.active}>
                                <FontAwesomeIcon className="mr-2" icon={["fas", "user"]} /> {loginText}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
