import React from 'react';
import BtnMain from '../buttons/btn_main';
import {toggleModal} from "../../actions/ui";
import { connect } from 'react-redux';

const BtnUpgradeMembership = ({ user, ui, dispatch, style }) => {
    // console.log(user);
    return (
            !user.is_paid ? <BtnMain
                text='Upgrade Membership'
                onClick={() => {
                    dispatch(toggleModal(true, 'subscription'))
                }}
                className="btn-green btn-block"
                style={style}
            /> : null
  )
};

const mapStateToProps = ({ user }) =>
    (
        {
            user: user.data,
        }
    );

export default connect(mapStateToProps)(BtnUpgradeMembership)