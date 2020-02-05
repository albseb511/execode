import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../../redux/admin/action";

const initData = [
  {
    selected: false,
    code: "nin_001",
    name: "Vishu Prasad",
    email: "vishnu009@gmail.com",
    batch: "ninja",
    sprint: "1"
  },
  {
    selected: false,
    code: "nin_002",
    name: "Bala Krishna",
    email: "bala_kris@gmail.com",
    batch: "samurai",
    sprint: "1"
  },
  {
    selected: false,
    code: "nin_003",
    name: "Mihir Kumar",
    email: "mihir@gmail.com",
    batch: "ninja",
    sprint: "3"
  },
  {
    selected: false,
    code: "nin_004",
    name: "Sanjay Anand",
    email: "sanjay@gmail.com",
    batch: "samurai",
    sprint: "2"
  }
];
const ViewUsers = ({ fetchAllUsers, token, users }) => {
  const [cohort, setCohort] = useState("all");

  useEffect(() => {
    const payload = {
      token
    };
    fetchAllUsers(payload);
  }, []);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center px-5 mx-5 mb-5">
        <table
          className="table table-striped text-center border border-dark col-md-8"
          style={{ marginTop: "100px" }}
        >
          <thead>
            <tr className="p-3 mb-2 thead-dark">
              <th scope="col">Select</th>
              <th scope="col">role</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">created at</th>
              <th scope="col row">
                tags:
                <select className="ml-2">
                  {["all", "samurai", "ninja"].map(list => (
                    <option key={list} value={list}>
                      {list}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(ele => {
                return (
                  <tr key={ele.email}>
                    <td>
                      <input
                        type="checkbox"
                        checked={ele.selected}
                        onChange={() => {}}
                        id={ele.code}
                      />
                    </td>
                    <td>{ele.role}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.created_at}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.admin.users,
  token: state.authReducer.token,
  isLoading: state.admin.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: payload => dispatch(fetchAllUsers(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);
