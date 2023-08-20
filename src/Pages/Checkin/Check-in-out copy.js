import React, {useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import './Check-in-out.css';

class Check_in_out extends React.Component {
    constructor() {
        super();
  
        this.displayData_in = [];
        this.displayData_out = [];
  
        this.state = {
          showdata : [],
          postVal : ""
        }

        this.prependData_in = this.prependData_in.bind(this);
        this.prependData_out = this.prependData_out.bind(this);
        this.handleChange = this.handleChange.bind(this);
  
    };
    prependData_in() {
        this.displayData_in.unshift(<div className="item_check_in">
        <div className="name_check_in">{this.state.postVal}</div>
        <div className="confirm_check_in">Đã check-in</div>
    </div>);
        this.setState({
           showdata : this.displayData_in,
           postVal : ""
        });
    }

    prependData_out() {
        this.displayData_out.unshift(<div className="item_check_out">
        <div className="name_check_out">{this.state.postVal}</div>
        <div className="confirm_check_out">Đã check-out</div>
    </div>);
        this.setState({
           showdata : this.displayData_out,
           postVal : ""
        });
    }

    handleChange(e) {
        let getTextAreaValue = e.target.value;
        this.setState({
            postVal :getTextAreaValue
        });
    }

    render() {
        return (
            <div id = "Check_in_out">
                <div className='title'>
                    <div>
                        ĐIỂM DANH SỰ KIỆN:
                    </div>
                    <div>
                        NGÀY HỘI VIỆC LÀM CSE JOB FAIR
                    </div>
                </div>
                <div className="container_check_in_out">                
                    <Tabs defaultActiveKey="Check-in" transition={true} id="tab" className="mb-3">
                        <Tab eventKey="Check-in" title="Check-in">
                            <div className="form_check_in">
                                <div className="text_check_in">CHECK-IN</div>
                                <input value={this.state.postVal} onChange={this.handleChange} className="input_check_in" type="text" placeholder="Nhập mã số sinh viên..."/>
                                <div className="button_check_in">
                                    <button onClick={this.prependData_in} type="submit" className="btn btn_submit_check_in">Nhập</button>
                                </div>
                            </div>
                            <div className="list_check_in">
                                    {this.displayData_in}
                            </div>
                        </Tab>
                        <Tab eventKey="Check-out" title="Check-out">
                            <div className="form_check_out">
                                <div className="text_check_out">CHECK-OUT</div>
                                <input value={this.state.postVal} onChange={this.handleChange} className="input_check_out" type="text" placeholder="Nhập mã số sinh viên..."/>
                                <div className="button_check_out">
                                    <button onClick={this.prependData_out} type="submit" className="btn btn_submit_check_out">Nhập</button>
                                </div>
                            </div>
                            <div className="list_check_out">
                                    {this.displayData_out}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default Check_in_out;