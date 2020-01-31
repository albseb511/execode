import React, { useState } from 'react'

let initData = [
    {
        selected: false,
        code: "nin_001",
        name: "Vishu Prasad",
        email: "vishnu009@gmail.com",
        batch: "ninja",
        sprint: "1"
    },
    {
        selected: true,
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
        selected: true,
        code: "nin_004",
        name: "Sanjay Anand",
        email: "sanjay@gmail.com",
        batch: "samurai",
        sprint: "2"
    },
]
const ViewUsers = () => {
    const [temp, setTemp] = useState(initData);
    const [cohort, setCohort] = useState("all");
    const [sprint, setSprint] = useState("all");
    const handleChange = () => {

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center px-5 mx-5">
                <table
                    className="table table-striped text-center border border-dark col-md-8"
                    style={{ marginTop: "100px" }}
                >
                    <thead>
                    <tr className="p-3 mb-2 thead-dark">
                        <th scope="col">Select</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col row">
                            batch: 
                            <select className="ml-2" 
                                    onChange={(e)=>setCohort(e.target.value)}>
                                {
                                [
                                    "all",
                                    "samurai",
                                    "ninja"
                                ]
                                .map(list=><option key={list} value={list}>{list}</option>)
                                }
                            </select>
                        </th>
                        <th scope="col">
                            sprint: 
                            <select className="ml-2" 
                                    onChange={(e)=>setSprint(e.target.value)}>
                                {
                                [
                                    "all",
                                    "1",
                                    "2",
                                    "3"
                                ]
                                .map(list=><option key={list} value={list}>{list}</option>)
                                }
                            </select>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {temp &&
                        temp
                        .filter(ele=>cohort==="all"?ele:(ele.batch===cohort?ele:null))
                        .filter(ele=>sprint==="all"?ele:(ele.sprint===sprint?ele:null))
                        .map((ele) => {
                        return (
                            <tr key={ele.email}>
                                <td>
                                    <input type="checkbox" 
                                           checked={ele.selected}/>
                                </td>
                                <td>{ele.code}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>{ele.batch}</td>
                                <td>{ele.sprint}</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default ViewUsers
