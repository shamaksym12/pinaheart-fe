import React from 'react';
import BtnMain from '../buttons/btn_main';
import { toggleModal } from "../../actions/ui";
import { connect } from 'react-redux';
import { Router } from '../../routes'

const BtnBextMatchCriteria = ({ user, ui, dispatch, style, onSubmit }) => {
    return (
        !user.is_paid ? <BtnMain
            text='Next: Match Criteria for your partner'
            onClick={onSubmit}
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

export default connect(mapStateToProps)(BtnBextMatchCriteria)