import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from "rsuite";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import actions from "../actions";
import jwt from "jsonwebtoken";

dotenv.config();
const { REACT_APP_API } = process.env;

function SignIn() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { replace, push } = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    user && replace("/");
  }, []);
  return (
    <div style={{ maxWidth: "30rem", margin: "auto", marginTop: "4rem" }}>
      <Panel bordered header="Iniciar sesión">
        <Form
          fluid
          onChange={(values) => setData(values)}
          onSubmit={async () => {
            setLoading(true);
            const { data: token } = await axios.post(
              `${REACT_APP_API}/auth/login`,
              data
            );
            window.localStorage.setItem("token", token);
            const user = jwt.decode(token);
            dispatch(actions.setUser(user));
            setLoading(false);
            replace("/");
          }}
        >
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" />
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button type="submit" appearance="primary">
                Login
              </Button>
              <Button type="button" onClick={() => push("signup")}>
                Crearme una cuenta
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
    </div>
  );
}

export default SignIn;
