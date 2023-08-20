import React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import './detailBtn.css'

const formatDate = (str) => {
    const day = new Date(str)
    return moment(day).format('L')+' '+moment(day).format('LT')
}

function DetailBtn(props) {
    return (
            <button type="button"
                className="btn detail"
                data-bs-toggle="modal"
                data-bs-target="#detailButt">
                Chi tiết
        </button>
    )
}

function EventDetail(props) {
    const data = props.data;

    return (
        <div className="modal fade"
            id="detailButt"
            tabIndex="-1"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Chi tiết sự kiện</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Tên sự kiện: {data.name}</div>
                    <div className="modal-body">Thời gian bắt đầu: {formatDate(data.start_date)}</div>
                    <div className="modal-body">Thời gian kết thúc: {formatDate(data.end_date)}</div>
                    <div className="modal-body">Email người đăng ký: {data.creator_email}</div>
                    <div className="modal-body"> Địa điểm: {data.location}</div>
                </div>
            </div>
        </div>
    )
}

function UserDetail(props) {
    return (
        <div className="modal fade"
            id="detailButt"
            tabIndex="-1"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Chi tiết tài khoản</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Họ và tên: {props.data.fullName}</div>
                    <div className="modal-body">Ngày sinh: {props.data.birthday}</div>
                    <div className="modal-body">Mã số sinh viên: {props.data.id}</div>
                    <div className="modal-body">Email: {props.data.email}</div>
                    <div className="modal-body">Số điện thoại: {props.data.phone}</div>
                </div>
            </div>
        </div>
    )
}



export { DetailBtn, EventDetail, UserDetail };