import React from 'react'
import { connect } from 'react-redux'
import DefaultLayout from './containers/DefaultLayout';
import { Header, Icon,  Dimmer } from 'semantic-ui-react';

class Main extends React.Component {

    render() {
        return (

            <div>
                <Dimmer active={this.props.active} onClickOutside={this.handleClose} page>
                    <Header as='h2' icon inverted>
                        <Icon name='heart' />
                        Dimmed Message!
                        <Header.Subheader>Dimmer sub-header</Header.Subheader>
                    </Header>
                </Dimmer>
                {this.props.isAuthenticated ? (
                    <React.Fragment>
                        <DefaultLayout {...this.props}  />
                    </React.Fragment>
                ) : (
                    <main className="fadeIn animated">
                        {this.props.children}
                    </main>
                    )}
            </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        permission:state.Auth.permissions,
        active : state.isLoading
    }
};

export default connect(mapStateToProps)(Main);
